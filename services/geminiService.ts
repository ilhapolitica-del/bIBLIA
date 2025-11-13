import { GoogleGenAI, Type } from "@google/genai";
import { BibleVerse, CrossReference, CommentaryContent } from "../types";

const getGeminiClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateCatholicCommentary = async (verse: BibleVerse): Promise<CommentaryContent> => {
  const ai = getGeminiClient();
  if (!ai) {
    throw new Error("Chave de API não configurada.");
  }

  const prompt = `
    Atue como um teólogo católico especialista, fiel ao Magistério da Igreja Católica Romana, à Sagrada Tradição e ao Catecismo da Igreja Católica (CIC).
    
    Analise a seguinte passagem bíblica:
    Livro: ${verse.book}
    Capítulo: ${verse.chapter}
    Versículo: ${verse.verse}
    Texto: "${verse.text}"

    Forneça uma resposta estruturada com dois componentes distintos:
    
    1. COMENTÁRIO TEOLÓGICO: Uma explicação espiritual e doutrinária, concisa (aprox. 150 palavras).
    2. SABEDORIA PATRÍSTICA: Uma citação, interpretação ou ensinamento específico de um dos Pais da Igreja (ex: Santo Agostinho, São João Crisóstomo, São Jerônimo, Santo Ambrósio) que se relacione diretamente com este texto ou tema. Identifique claramente quem é o Santo/Padre.

    Diretrizes:
    - Tom reverente e educativo.
    - Fidelidade total à doutrina católica.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      theological: {
        type: Type.STRING,
        description: "Comentário teológico e pastoral geral sobre o versículo."
      },
      patristic: {
        type: Type.STRING,
        description: "O conteúdo do ensinamento ou citação do Padre da Igreja."
      },
      patristicSource: {
        type: Type.STRING,
        description: "Nome do Padre da Igreja (ex: 'Santo Agostinho')."
      }
    },
    required: ["theological", "patristic", "patristicSource"]
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });
    
    if (response.text) {
      return JSON.parse(response.text) as CommentaryContent;
    }
    throw new Error("Resposta vazia.");
  } catch (error) {
    console.error("Erro ao gerar comentário:", error);
    throw new Error("Erro ao conectar com o serviço de teologia.");
  }
};

export const generateCrossReferences = async (verse: BibleVerse): Promise<CrossReference[]> => {
  const ai = getGeminiClient();
  if (!ai) return [];

  const prompt = `
    Para a passagem bíblica católica: ${verse.book} ${verse.chapter}:${verse.verse} ("${verse.text}"),
    Forneça 3 a 4 referências cruzadas (versículos relacionados) que ajudem a explicar o contexto teológico, 
    cumprimento de profecias ou conexões doutrinárias (ex: conexões entre Antigo e Novo Testamento).
    
    Foque na teologia católica (tipologia, sacramentos, dogmas).
  `;

  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        reference: { type: Type.STRING, description: "Referência (ex: Jo 1,14)" },
        text: { type: Type.STRING, description: "O texto do versículo relacionado" },
        reason: { type: Type.STRING, description: "Breve explicação de por que este versículo está conectado (máx 1 frase)" }
      },
      required: ["reference", "text", "reason"]
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as CrossReference[];
    }
    return [];
  } catch (error) {
    console.error("Erro ao gerar referências cruzadas:", error);
    return [];
  }
};
