export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface SearchResult {
  verse: BibleVerse;
  relevance: number; // Simple relevance score
  isPrimary?: boolean;
}

export interface CrossReference {
  reference: string;
  text: string;
  reason: string;
}

export interface CommentaryContent {
  theological: string;
  patristic: string;
  patristicSource: string; // e.g., "Saint Augustine"
}

export interface CommentaryState {
  isLoading: boolean;
  content: CommentaryContent | null;
  error: string | null;
  forReference: string | null; // Stores "John 3:16" to ensure commentary matches view
  isCrossRefLoading: boolean;
  crossReferences: CrossReference[] | null;
}

export interface SavedCommentary {
  id: string;
  verse: BibleVerse;
  content: CommentaryContent;
  savedAt: string; // ISO date string
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

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink';

export interface Highlights {
  [verseId: string]: HighlightColor;
}

export interface Notes {
  [verseId: string]: string;
}
