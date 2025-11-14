import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { SearchResultCard } from './components/SearchResultCard';
import { CommentaryPanel } from './components/CommentaryPanel';
import { CrossReferencesPanel } from './components/CrossReferencesPanel';
import { SearchHistory } from './components/SearchHistory';
import { ReadingModeToggle } from './components/ReadingModeToggle';
import { searchBible } from './services/bibleService';
import { generateCatholicCommentary, generateCrossReferences } from './services/geminiService';
import { BibleVerse, SearchResult, CommentaryState } from './types';
import { BrowserRouter } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [readingMode, setReadingMode] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [commentary, setCommentary] = useState<CommentaryState>({
    isLoading: false,
    content: null,
    error: null,
    forReference: null,
    isCrossRefLoading: false,
    crossReferences: null
  });

  // Load history from localStorage on initial mount
  useEffect(() => {
    try {
        const storedHistory = localStorage.getItem('verbumDeiHistory');
        if (storedHistory) {
            setSearchHistory(JSON.parse(storedHistory));
        }
    } catch (error) {
        console.error("Failed to parse search history from localStorage", error);
    }
  }, []);

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

  // Scroll to top when entering reading mode
  useEffect(() => {
    if (readingMode) {
      window.scrollTo(0, 0);
    }
  }, [readingMode]);

  const updateHistory = (newQuery: string) => {
    const trimmedQuery = newQuery.trim();
    const updatedHistory = [trimmedQuery, ...searchHistory.filter(h => h.toLowerCase() !== trimmedQuery.toLowerCase())].slice(0, 7);
    setSearchHistory(updatedHistory);
    localStorage.setItem('verbumDeiHistory', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('verbumDeiHistory');
  };

  // Core Search Logic
  const doSearch = async (searchTerm: string) => {
    if (searchTerm.trim().length < 2) return;
    
    setIsSearching(true);
    setResults([]);
    setSelectedVerse(null);
    setCommentary({ 
      isLoading: false, 
      content: null, 
      error: null, 
      forReference: null,
      isCrossRefLoading: false,
      crossReferences: null
    });
    updateHistory(searchTerm);

    try {
      const searchResults = await searchBible(searchTerm, selectedBook);
      setResults(searchResults);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchFromBar = () => {
    doSearch(query);
  };

  const handleHistorySearch = (term: string) => {
    setQuery(term);
    doSearch(term);
  };
  
  // Helper to trigger search from suggestion buttons
  const triggerSearch = (text: string) => {
    setQuery(text);
    setSelectedBook(""); 
    doSearch(text);
  };

  // Handle Verse Selection and Commentary Generation
  const handleVerseSelect = useCallback(async (verse: BibleVerse) => {
    setSelectedVerse(verse);
    const referenceKey = `${verse.book} ${verse.chapter}:${verse.verse}`;

    if (commentary.forReference === referenceKey && commentary.content) {
      return;
    }

    setCommentary({
      isLoading: true,
      content: null,
      error: null,
      forReference: referenceKey,
      isCrossRefLoading: true,
      crossReferences: null
    });

    generateCatholicCommentary(verse)
      .then(data => {
        setCommentary(prev => ({ ...prev, isLoading: false, content: data }));
      })
      .catch(err => {
        setCommentary(prev => ({ ...prev, isLoading: false, error: "Não foi possível carregar o comentário. Verifique sua conexão ou chave de API." }));
      });

    generateCrossReferences(verse)
      .then(refs => {
        setCommentary(prev => ({ ...prev, isCrossRefLoading: false, crossReferences: refs }));
      })
      .catch(err => {
        console.error("Failed to fetch cross refs", err);
        setCommentary(prev => ({ ...prev, isCrossRefLoading: false, crossReferences: [] }));
      });
  }, [commentary.forReference, commentary.content]);

  return (
    <BrowserRouter>
      <div className={`min-h-screen flex flex-col ${readingMode ? 'bg-paper-50 dark:bg-slate-900' : ''}`}>
        {!readingMode && <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />}

        <main className={`flex-grow container mx-auto px-4 max-w-5xl ${readingMode ? 'py-4' : 'py-8'}`}>
          
          {!readingMode && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-paper-50 mb-3">
                  Sagradas Escrituras
                </h2>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Pesquise na Bíblia Católica e receba explicações fundamentadas na Tradição Apostólica, nos Padres da Igreja e no Magistério.
                </p>
              </div>

              <SearchBar 
                value={query} 
                onChange={setQuery} 
                onSearch={handleSearchFromBar}
                selectedBook={selectedBook}
                onBookChange={setSelectedBook}
              />

              <SearchHistory history={searchHistory} onSearch={handleHistorySearch} onClear={clearHistory} />
            </>
          )}


          {isSearching && (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="animate-spin text-gold-500" size={48} />
                <p className="text-slate-500 dark:text-slate-400 font-serif italic">Buscando nas Escrituras...</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            
            <div className={`space-y-4 ${results.length === 0 || isSearching ? 'hidden' : ''} ${readingMode ? 'lg:col-span-5' : 'lg:col-span-3'}`}>
               {!readingMode && (
                 <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">
                   <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Resultados</span>
                   <span className="text-xs text-slate-400">{results.length} encontrados</span>
                 </div>
               )}
               
               {results.map((result, index) => (
                 <SearchResultCard 
                   key={`${result.verse.book}-${result.verse.chapter}-${result.verse.verse}-${index}`}
                   verse={result.verse}
                   isSelected={selectedVerse?.book === result.verse.book && selectedVerse?.chapter === result.verse.chapter && selectedVerse?.verse === result.verse.verse}
                   onSelect={handleVerseSelect}
                   searchQuery={query}
                   isPrimary={result.isPrimary}
                   isReadingMode={readingMode}
                 />
               ))}
            </div>

            {!readingMode && (
              <div className={`lg:col-span-2 lg:sticky lg:top-24 ${isSearching ? 'hidden lg:block opacity-50' : ''}`}>
                {selectedVerse ? (
                  <>
                    <div className="bg-gold-5 dark:bg-slate-800/30 border border-gold-200 dark:border-gold-900/30 p-4 rounded-lg mb-4">
                       <h4 className="font-display font-bold text-crimson-900 dark:text-gold-500 mb-2 border-b border-gold-200 dark:border-slate-700 pb-2">
                         {selectedVerse.book} {selectedVerse.chapter}, {selectedVerse.verse}
                       </h4>
                       <p className="font-serif text-slate-800 dark:text-slate-300 text-lg italic">
                         "{selectedVerse.text}"
                       </p>
                    </div>
                    <CommentaryPanel commentary={commentary} />
                    <CrossReferencesPanel 
                      references={commentary.crossReferences} 
                      isLoading={commentary.isCrossRefLoading} 
                    />
                  </>
                ) : (
                   results.length > 0 && !isSearching && (
                     <div className="hidden lg:flex flex-col items-center justify-center h-64 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-6 text-center">
                       <span className="text-4xl mb-2">✝️</span>
                       <p>Selecione um versículo ao lado para ler o comentário teológico e patrístico.</p>
                     </div>
                   )
                )}
              </div>
            )}


            {!readingMode && !isSearching && results.length === 0 && (
               <div className="col-span-1 lg:col-span-5 text-center py-12">
                 <div className="inline-block p-4 rounded-full bg-paper-100 dark:bg-slate-800 mb-4">
                    <BookOpenIcon />
                 </div>
                 <h3 className="text-xl font-display font-bold text-slate-700 dark:text-slate-300">Comece sua leitura</h3>
                 <p className="text-slate-500 mt-2">Selecione um livro, digite uma referência ou um tema.</p>
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

        {!readingMode && (
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
        )}

        {results.length > 0 && !isSearching && (
          <ReadingModeToggle 
            isReadingMode={readingMode} 
            onToggle={() => setReadingMode(!readingMode)}
          />
        )}
      </div>
    </BrowserRouter>
  );
};

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