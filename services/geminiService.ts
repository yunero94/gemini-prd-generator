import { GoogleGenAI, Type } from "@google/genai";
import { PRDParams, GeneratedPRD } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize the client
const ai = new GoogleGenAI({ apiKey });

export const generatePRD = async (params: PRDParams): Promise<GeneratedPRD> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const {
    projectName,
    description,
    projectType,
    detailLevel,
    targetAudience,
    includeTechStack,
    includeUserStories
  } = params;

  // Using gemini-3-pro-preview for high quality reasoning and formatting.
  const modelId = "gemini-3-pro-preview";

  const systemPrompt = `You are a Senior Product Manager with over 15 years of experience in technical writing and software architecture.
  Your task is to write a comprehensive Product Requirements Document (PRD) for a new software project and evaluate its quality.
  The PRD must be professional, clear, structured, and ready for developers and stakeholders.`;

  let prompt = `
  **Project Name:** ${projectName}
  **Project Type:** ${projectType}
  **Target Audience:** ${targetAudience || "General Users"}
  **Description/Idea:** ${description}
  
  **Requirements:**
  1. **Level of Detail:** ${detailLevel}
  2. Structure the document with standard PRD sections: Executive Summary, Problem Statement, Goals, Functional Requirements, Non-Functional Requirements, and Future Scope.
  `;

  if (includeUserStories) {
    prompt += `\n- Include a detailed "User Stories" section in a table format.`;
  }

  if (includeTechStack) {
    prompt += `\n- Include a "Recommended Technology Stack" section explaining choices.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            markdownContent: { 
              type: Type.STRING, 
              description: "The full PRD content in Markdown format. Use headings (#, ##), bullet points, and tables." 
            },
            completenessScore: { 
              type: Type.INTEGER, 
              description: "A score from 0 to 100 rating the completeness and quality of this PRD based on the input provided." 
            },
            qualityAnalysis: { 
              type: Type.STRING, 
              description: "A brief analysis (1-2 sentences) of why this score was given and what might be missing if the score is low." 
            },
          },
          required: ["title", "markdownContent", "completenessScore", "qualityAnalysis"],
        },
      },
    });

    if (response.text) {
      const rawData = JSON.parse(response.text);
      
      // Inject client-side metadata
      const data: GeneratedPRD = {
        ...rawData,
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        timestamp: Date.now()
      };
      
      return data;
    } else {
      throw new Error("No content generated.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error instanceof Error) {
       throw new Error(`Generation failed: ${error.message}`);
    }
    throw new Error("An unexpected error occurred during PRD generation.");
  }
};