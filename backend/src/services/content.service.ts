import contentModel from "../model/content.model.js";
import { detectLinkType } from "../utils/detectLinkType.js";
import { processYoutubeVideo } from "../processors/youtube.processor.js";

export const addContent = async (userId: string, data: any) => {

  const { link, title } = data;

   const type = detectLinkType(link);
  if (type === "unknown") {
    throw new Error("Unsupported link type");
  }
  else if (type === "youtube") {
    return await processYoutubeVideo(userId, title, link);
  }
};



export const getContent = async (userId: string) => {

  return await contentModel.find({ userId });

};




export const deleteContent = async (userId: string, id: string) => {

  const content = await contentModel.findOneAndDelete({
    _id: id,
    userId
  });

  if (!content) {
    throw new Error("Content not found");
  }

  return true;
};