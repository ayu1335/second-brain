import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";



const ai = new GoogleGenAI({ apiKey:env.GEMINI_API_KEY || "" });

export const generateEmbeddings = async (text: string): Promise<number[]> => {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  });

  return response.embeddings?.[0]?.values ?? [];
};