import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";

const ai = new GoogleGenAI({ apiKey:env.GEMINI_API_KEY || "" });

export const summarize = async (transcript: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `You are a helpful assistant. Summarize the following YouTube video transcript in a clear and concise paragraph. Focus on the main topics and key takeaways.
    
Transcript:
${transcript}`,
  });

  return response.text || "No summary available";
};