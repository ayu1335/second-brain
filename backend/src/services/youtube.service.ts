import Content from "../model/content.model.js";

interface ChunkData {
  text: string;
  embedding: number[];
}

interface SaveYoutubeContentParams {
  userId: string;
  videoId: string;
  title: string;
  link: string;
  summary: string;
  tags: string[];
  chunks: ChunkData[];
}

export const saveYoutubeContent = async (data: SaveYoutubeContentParams) => {
  const content = new Content({
    userId: data.userId,
    type: "youtube",
    videoId: data.videoId,
    title: data.title,
    link: data.link,
    summary: data.summary,
    tags: data.tags,
    chunks: data.chunks,
  });

  await content.save();
  return content;
};