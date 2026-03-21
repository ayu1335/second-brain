import { YoutubeTranscript } from "youtube-transcript";

import { extractYoutubeId } from "../utils/extractYoutubeId.js";
import { summarize } from "../ai/summarize.js";
import { response } from "express";
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
    const extractedVideoId = extractYoutubeId(link);
    if (!extractedVideoId) {
      throw new Error("Invalid YouTube URL");
    }
    const transcriptData = await YoutubeTranscript.fetchTranscript(extractedVideoId);
    const transcript = transcriptData.map((item) => item.text).join(" ");

    const summary = await summarize(transcript);

    const tags = await generateTags(summary);
    const chunks = chunkText(transcript, 500);

    const chunkEmbeddings = await Promise.all(
      chunks.map(async (chunk) => ({
        text: chunk,
        embedding: await generateEmbeddings(chunk),
      })),
    );



    await saveYoutubeContent({
    userId,
    videoId: extractedVideoId,
    title,
    link,
    summary,
    tags,
    chunks: chunkEmbeddings,
  });



  } catch (error) {
    return response
      .status(500)
      .json({ msg: "Error fetching transcript", error: error });
  }
};
