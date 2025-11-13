import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { SearchResultCard } from './components/SearchResultCard';
import { CommentaryPanel } from './components/CommentaryPanel';
import { searchBible } from './services/bibleService';
import { generateCatholicCommentary } from './services/geminiService';
import { BibleVerse, SearchResult, CommentaryState } from './types';
import { HashRouter } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false); // New loading state for search
  const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null);
  const [commentary, setCommentary] = useState<CommentaryState>({
    isLoading: false,
    content: null,
    error: null,
    forReference: null
  });

  // Handle Dark Mode System Preference
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Toggle Dark Mode Class on Document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Async Search Handler
  const handleSearch = async () => {
    if (query.trim().length >= 2) {
      setIsSearching(true);
      setResults([]); // Clear previous results immediately
      setSelectedVerse(null);
      setCommentary({ isLoading: false, content: null, error: null, forReference: null });

      try {
        const searchResults = await searchBible(query);
        setResults(searchResults);
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setIsSearching(false);
      }
    }
  };

  // Helper to trigger search from suggestion buttons
  const triggerSearch = (text: string) => {
    setQuery(text);
    // We need to call the search logic directly with the new text
    // Using a small timeout ensures state is updated if we were using useEffect, 
    // but calling a specific async function is safer.
    setIsSearching(true);
    setResults([]);
    setSelectedVerse(null);
    
    // Call searchBible directly with the text
    searchBible(text).then(res => {
      setResults(res);
      setIsSearching(false);
    });
  };

  // Handle Verse Selection and Commentary Generation
  const handleVerseSelect = useCallback(async (verse: BibleVerse) => {
    setSelectedVerse(verse);
    const referenceKey = `${verse.book} ${verse.chapter}:${verse.verse}`;

    // Don't regenerate if we already have it for this verse
    if (commentary.forReference === referenceKey && commentary.content) {
      return;
    }

    setCommentary({
      isLoading: true,
      content: null,
      error: null,
      forReference: referenceKey
    });

    try {
      const text = await generateCatholicCommentary(verse);
      setCommentary({
        isLoading: false,
        content: text,
        error: null,
        forReference: referenceKey
      });
    } catch (err) {
      setCommentary({
        isLoading: false,
        content: null,
        error: "Não foi possível carregar o comentário. Verifique sua conexão ou chave de API.",
        forReference: referenceKey
      });
    }
  }, [commentary.forReference, commentary.content]);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

        <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-paper-50 mb-3">
              Sagradas Escrituras
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Pesquise na Bíblia Católica e receba explicações fundamentadas na Tradição Apostólica e no Magistério da Igreja.
            </p>
          </div>

          <SearchBar 
            value={query} 
            onChange={setQuery} 
            onSearch={handleSearch}
          />

          {/* Loading State for Search */}
          {isSearching && (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="animate-spin text-gold-500" size={48} />
                <p className="text-slate-500 dark:text-slate-400 font-serif italic">Buscando nas Escrituras...</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            
            {/* Left Column: Search Results */}
            <div className={`lg:col-span-3 space-y-4 ${results.length === 0 || isSearching ? 'hidden' : ''}`}>
               <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">
                 <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Resultados</span>
                 <span className="text-xs text-slate-400">{results.length} encontrados</span>
               </div>
               
               {results.map((result, index) => (
                 <SearchResultCard 
                   key={`${result.verse.book}-${result.verse.chapter}-${result.verse.verse}-${index}`}
                   verse={result.verse}
                   isSelected={selectedVerse?.book === result.verse.book && selectedVerse?.chapter === result.verse.chapter && selectedVerse?.verse === result.verse.verse}
                   onSelect={handleVerseSelect}
                   searchQuery={query}
                 />
               ))}
            </div>

            {/* Right Column: Commentary (Sticky) */}
            <div className={`lg:col-span-2 lg:sticky lg:top-24 ${isSearching ? 'hidden lg:block opacity-50' : ''}`}>
              {selectedVerse ? (
                <>
                  <div className="bg-gold-50 dark:bg-slate-800/30 border border-gold-200 dark:border-gold-900/30 p-4 rounded-lg mb-4">
                     <h4 className="font-display font-bold text-crimson-900 dark:text-gold-500 mb-2 border-b border-gold-200 dark:border-slate-700 pb-2">
                       {selectedVerse.book} {selectedVerse.chapter}, {selectedVerse.verse}
                     </h4>
                     <p className="font-serif text-slate-800 dark:text-slate-300 text-lg italic">
                       "{selectedVerse.text}"
                     </p>
                  </div>
                  <CommentaryPanel commentary={commentary} />
                </>
              ) : (
                 results.length > 0 && !isSearching && (
                   <div className="hidden lg:flex flex-col items-center justify-center h-64 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-6 text-center">
                     <span className="text-4xl mb-2">✝️</span>
                     <p>Selecione um versículo ao lado para ler o comentário teológico.</p>
                   </div>
                 )
              )}
            </div>

            {/* Empty State (Only show if not searching and no results) */}
            {!isSearching && results.length === 0 && (
               <div className="col-span-1 lg:col-span-5 text-center py-12">
                 <div className="inline-block p-4 rounded-full bg-paper-100 dark:bg-slate-800 mb-4">
                    <BookOpenIcon />
                 </div>
                 <h3 className="text-xl font-display font-bold text-slate-700 dark:text-slate-300">Comece sua leitura</h3>
                 <p className="text-slate-500 mt-2">Digite qualquer referência bíblica ou tema.</p>
                 <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                    <SuggestionButton 
                      text="João 3,16" 
                      onClick={() => triggerSearch("João 3,16")} 
                    />
                    <SuggestionButton 
                      text="Salmos 23" 
                      onClick={() => triggerSearch("Salmos 23")} 
                    />
                    <SuggestionButton 
                      text="Gênesis 3,15-20" 
                      onClick={() => triggerSearch("Gênesis 3,15-20")} 
                    />
                 </div>
               </div>
            )}
          </div>
        </main>

        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p className="font-display font-bold text-lg text-slate-800 dark:text-paper-50 mb-2">Verbum Dei</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Baseado na Sagrada Escritura e no ensinamento da Igreja Católica. 
              As interpretações geradas por IA buscam fidelidade ao Magistério, mas não substituem a orientação de um diretor espiritual ou sacerdote.
            </p>
            <p className="text-xs text-slate-400 mt-4">
              Ad Maiorem Dei Gloriam
            </p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

// Helper components for the main page layout
const SuggestionButton = ({ text, onClick }: { text: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md hover:border-gold-400 dark:hover:border-gold-600 transition-all text-slate-700 dark:text-slate-300 font-serif"
  >
    {text}
  </button>
);

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

export default App;