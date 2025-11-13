import { GoogleGenAI } from "@google/genai";
import { BibleVerse } from "../types";

const getGeminiClient = () => {
  const apiKey = "AIzaSyCn7MOMMciECPjeWC-FaHmSxDOZZubhpus";ll;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateCatholicCommentary = async (verse: BibleVerse): Promise<string> => {
  const ai = getGeminiClient();
  if (!ai) {
    throw new Error("Chave de API não configurada.");
  }

  const prompt = `
    Atue como um teólogo católico especialista, fiel ao Magistério da Igreja Católica Romana, à Sagrada Tradição e ao Catecismo da Igreja Católica (CIC).
    
    Forneça um breve comentário teológico e pastoral sobre a seguinte passagem bíblica:
    Livro: ${verse.book}
    Capítulo: ${verse.chapter}
    Versículo: ${verse.verse}
    Texto: "${verse.text}"

    Diretrizes:
    1. O tom deve ser reverente, espiritual e educativo.
    2. Explique o significado do texto à luz da fé católica.
    3. Se relevante, faça breves conexões com os Padres da Igreja, Santos ou o Catecismo.
    4. Mantenha o texto conciso, com no máximo 250 palavras.
    5. Evite interpretações puramente seculares ou protestantes que contradigam a doutrina católica.
    6. Formate a resposta em texto corrido, elegante, sem marcadores excessivos.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Não foi possível gerar o comentário no momento.";
  } catch (error) {
    console.error("Erro ao gerar comentário:", error);
    throw new Error("Erro ao conectar com o serviço de teologia.");
  }
};
