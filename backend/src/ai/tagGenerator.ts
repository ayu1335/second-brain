// src/ai/tagGenerator.ts
import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";


const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY || "" });

export const generateTags = async (summary: string): Promise<string[]> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Generate 5 short relevant tags for this content summary. Return only a JSON array of strings, nothing else.
    
Summary:
${summary}`,
  });

  const text = response.text || "";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
};