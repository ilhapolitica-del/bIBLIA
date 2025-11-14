import { GoogleGenAI, Type } from "@google/genai";
import { SearchResult } from '../types';

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const searchBible = async (query: string, bookFilter?: string): Promise<SearchResult[]> => {
  if (!query || query.trim().length < 2) return [];

  const ai = getGeminiClient();
  if (!ai) {
    console.error("AI Client not initialized");
    return [];
  }

  // Schema strictness ensures we get valid JSON back for our frontend
  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        book: { type: Type.STRING, description: "Nome do livro bíblico em Português (Canon Católico)" },
        chapter: { type: Type.INTEGER, description: "Número do capítulo" },
        verse: { type: Type.INTEGER, description: "Número do versículo" },
        text: { type: Type.STRING, description: "Texto do versículo na tradução católica (Ave Maria ou CNBB)" },
        isPrimary: { type: Type.BOOLEAN, description: "Verdadeiro se este é um dos 1-3 versículos mais centrais e teologicamente importantes para a consulta do usuário." },
      },
      required: ["book", "chapter", "verse", "text"],
    },
  };

  let prompt = `
    Você é uma API de Busca Bíblica Católica Inteligente.
    O usuário pesquisou: "${query}".

    TAREFA:
    1. Identifique se a busca é uma referência específica (ex: "Gn 3,15-20", "João 3:16") ou uma busca por palavra-chave (ex: "Fé", "Eucaristia").
    2. Retorne os versículos exatos da BÍBLIA CATÓLICA (incluindo deuterocanônicos se necessário: Tobias, Judite, 1 e 2 Macabeus, Sabedoria, Eclesiástico, Baruc).
    3. Use a tradução "Bíblia Ave Maria" ou "CNBB".
    4. Se for uma referência (ex: "Gen 3,15-20"), retorne TODOS os versículos do intervalo solicitado.
    5. Se for uma palavra-chave, retorne os 10 versículos mais relevantes teologicamente. DENTRE ELES, marque os 1 a 3 mais importantes com 'isPrimary: true'.
    6. Mantenha a fidelidade total ao texto bíblico.
  `;

  if (bookFilter) {
    prompt += `
    7. FILTRO ATIVO: O usuário restringiu a busca EXCLUSIVAMENTE ao livro: "${bookFilter}". 
       IGNORE versículos de outros livros, mesmo que sejam relevantes. Retorne resultados apenas de ${bookFilter}.
    `;
  }

  prompt += `
    Retorne APENAS o JSON array.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.1, // Low temperature for precise text retrieval
      },
    });

    if (response.text) {
      const verses = JSON.parse(response.text);
      
      // Map to SearchResult format with a default high relevance since AI selected them
      return verses.map((v: any) => ({
        verse: {
          book: v.book,
          chapter: v.chapter,
          verse: v.verse,
          text: v.text
        },
        relevance: 100,
        isPrimary: v.isPrimary || false,
      }));
    }
    return [];
  } catch (error) {
    console.error("Erro na busca inteligente:", error);
    // Return empty array or handle error gracefully in UI
    return [];
  }
};