import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { NewsItem } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Chat with Gemini (Standard Text)
 */
export const chatWithGemini = async (history: { role: string; parts: { text: string }[] }[], message: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      history: history,
      config: {
        systemInstruction: "You are a helpful AI assistant for a student project about 'The Impact of AI on Society'. Keep answers concise and educational.",
      },
    });

    const response = await chat.sendMessage({ message });
    return response.text || "I couldn't generate a text response.";
  } catch (error) {
    console.error("Chat error:", error);
    return "Sorry, I encountered an error connecting to the AI.";
  }
};

/**
 * AI Agent: Fetch latest news using Google Search Grounding
 */
export const fetchAINews = async (query: string): Promise<{ text: string; sources: NewsItem[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find the latest news and trends about: ${query}`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No summary available.";
    
    // Extract grounding chunks for sources
    const sources: NewsItem[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web?.uri && chunk.web?.title) {
          sources.push({
            title: chunk.web.title,
            uri: chunk.web.uri
          });
        }
      });
    }

    return { text, sources };
  } catch (error) {
    console.error("Agent error:", error);
    throw new Error("Failed to fetch news.");
  }
};

/**
 * Generate Image using Gemini 2.5 Flash Image
 */
export const generateAIImage = async (prompt: string): Promise<string> => {
  try {
    // Note: Using generateContent for generation as per guide for gemini-2.5-flash-image
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        }
      }
    });

    // Iterate to find image part
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data returned.");
  } catch (error) {
    console.error("Image gen error:", error);
    throw error;
  }
};