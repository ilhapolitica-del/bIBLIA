export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface SearchResult {
  verse: BibleVerse;
  relevance: number; // Simple relevance score
}

export interface CommentaryState {
  isLoading: boolean;
  content: string | null;
  error: string | null;
  forReference: string | null; // Stores "John 3:16" to ensure commentary matches view
}

export enum BibleBookGroup {
  PENTATEUCH = "Pentateuco",
  HISTORICAL = "Livros Históricos",
  WISDOM = "Livros Sapienciais",
  PROPHETIC = "Livros Proféticos",
  GOSPELS = "Evangelhos",
  ACTS = "Atos dos Apóstolos",
  PAULINE_EPISTLES = "Cartas Paulinas",
  GENERAL_EPISTLES = "Cartas Católicas",
  REVELATION = "Apocalipse"
}