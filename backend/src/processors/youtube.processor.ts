import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { extractYoutubeId } from "../utils/extractYoutubeId.js";
import { getYoutubeTranscript } from "../utils/getYoutubeTranscript.js";
import { summarize } from "../ai/summarize.js";
import { generateEmbeddings } from "../ai/embeddings.js";
import { generateTags } from "../ai/tagGenerator.js";
import { chunkText } from "../utils/chunkText.js";
import { saveYoutubeContent } from "../services/youtube.service.js";

export const processYoutubeVideo = async (
  userId: string,
  title: string,
  link: string
) => {
  try {
    // console.log("Starting processYoutubeVideo for:", { userId, title, link });

    const extractedVideoId = extractYoutubeId(link);
    if (!extractedVideoId) {
      throw new Error("Invalid YouTube URL");
    }
    // console.log("Extracted video ID:", extractedVideoId);

    const transcript = await getYoutubeTranscript(extractedVideoId);

    const summary = await summarize(transcript);
    // console.log("Summary generated");

    const tags = await generateTags(summary);
    // console.log("Tags generated:", tags);

    const chunks = chunkText(transcript, 500);
    if (!chunks || chunks.length === 0) {
      throw new Error("Text chunking failed or returned no content.");
    }
    // console.log("Chunks created:", chunks.length);

    const chunkEmbeddings = await Promise.all(
      chunks.map(async (chunk) => {
        if (!chunk.trim()) return null;
        return {
          text: chunk,
          embedding: await generateEmbeddings(chunk),
        };
      }),
    );

    const validEmbeddings = chunkEmbeddings.filter(
      (c): c is { text: string; embedding: number[] } => c !== null
    );
    // console.log("Valid embeddings:", validEmbeddings.length);

    await saveYoutubeContent({
      userId,
      videoId: extractedVideoId,
      title,
      link,
      summary,
      tags,
      chunks: validEmbeddings,
    });

    // console.log("Content saved successfully for videoId:", extractedVideoId);

  } catch (error: any) {
    console.error("Full error:", error.message);
    throw error;
  }
};
