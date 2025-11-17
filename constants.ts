import { BibleVerse, BibleBookGroup } from './types';

export const BIBLE_TRANSLATIONS: Record<string, string> = {
  "AVE_MARIA": "Bíblia Ave Maria (Português)",
  "CNBB": "Bíblia CNBB (Português)",
  "JERUSALEM": "Bíblia de Jerusalém (Português)",
  "NVI": "Nova Versão Internacional (Português)",
  "VULGATA": "Vulgata Clementina (Latim)",
  "DOUAY_RHEIMS": "Douay-Rheims (Inglês)",
};

// Complete List of Catholic Bible Books
export const CATHOLIC_BOOKS: Record<string, BibleBookGroup> = {
  // Old Testament
  "Gênesis": BibleBookGroup.PENTATEUCH,
  "Êxodo": BibleBookGroup.PENTATEUCH,
  "Levítico": BibleBookGroup.PENTATEUCH,
  "Números": BibleBookGroup.PENTATEUCH,
  "Deuteronômio": BibleBookGroup.PENTATEUCH,
  "Josué": BibleBookGroup.HISTORICAL,
  "Juízes": BibleBookGroup.HISTORICAL,
  "Rute": BibleBookGroup.HISTORICAL,
  "1 Samuel": BibleBookGroup.HISTORICAL,
  "2 Samuel": BibleBookGroup.HISTORICAL,
  "1 Reis": BibleBookGroup.HISTORICAL,
  "2 Reis": BibleBookGroup.HISTORICAL,
  "1 Crônicas": BibleBookGroup.HISTORICAL,
  "2 Crônicas": BibleBookGroup.HISTORICAL,
  "Esdras": BibleBookGroup.HISTORICAL,
  "Neemias": BibleBookGroup.HISTORICAL,
  "Tobias": BibleBookGroup.HISTORICAL,
  "Judite": BibleBookGroup.HISTORICAL,
  "Ester": BibleBookGroup.HISTORICAL,
  "1 Macabeus": BibleBookGroup.HISTORICAL,
  "2 Macabeus": BibleBookGroup.HISTORICAL,
  "Jó": BibleBookGroup.WISDOM,
  "Salmos": BibleBookGroup.WISDOM,
  "Provérbios": BibleBookGroup.WISDOM,
  "Eclesiastes": BibleBookGroup.WISDOM,
  "Cântico dos Cânticos": BibleBookGroup.WISDOM,
  "Sabedoria": BibleBookGroup.WISDOM,
  "Eclesiástico": BibleBookGroup.WISDOM,
  "Isaías": BibleBookGroup.PROPHETIC,
  "Jeremias": BibleBookGroup.PROPHETIC,
  "Lamentações": BibleBookGroup.PROPHETIC,
  "Baruc": BibleBookGroup.PROPHETIC,
  "Ezequiel": BibleBookGroup.PROPHETIC,
  "Daniel": BibleBookGroup.PROPHETIC,
  "Oseias": BibleBookGroup.PROPHETIC,
  "Joel": BibleBookGroup.PROPHETIC,
  "Amós": BibleBookGroup.PROPHETIC,
  "Abdias": BibleBookGroup.PROPHETIC,
  "Jonas": BibleBookGroup.PROPHETIC,
  "Miqueias": BibleBookGroup.PROPHETIC,
  "Naum": BibleBookGroup.PROPHETIC,
  "Habacuc": BibleBookGroup.PROPHETIC,
  "Sofonias": BibleBookGroup.PROPHETIC,
  "Ageu": BibleBookGroup.PROPHETIC,
  "Zacarias": BibleBookGroup.PROPHETIC,
  "Malaquias": BibleBookGroup.PROPHETIC,
  // New Testament
  "Mateus": BibleBookGroup.GOSPELS,
  "Marcos": BibleBookGroup.GOSPELS,
  "Lucas": BibleBookGroup.GOSPELS,
  "João": BibleBookGroup.GOSPELS,
  "Atos dos Apóstolos": BibleBookGroup.ACTS,
  "Romanos": BibleBookGroup.PAULINE_EPISTLES,
  "1 Coríntios": BibleBookGroup.PAULINE_EPISTLES,
  "2 Coríntios": BibleBookGroup.PAULINE_EPISTLES,
  "Gálatas": BibleBookGroup.PAULINE_EPISTLES,
  "Efésios": BibleBookGroup.PAULINE_EPISTLES,
  "Filipenses": BibleBookGroup.PAULINE_EPISTLES,
  "Colossenses": BibleBookGroup.PAULINE_EPISTLES,
  "1 Tessalonicenses": BibleBookGroup.PAULINE_EPISTLES,
  "2 Tessalonicenses": BibleBookGroup.PAULINE_EPISTLES,
  "1 Timóteo": BibleBookGroup.PAULINE_EPISTLES,
  "2 Timóteo": BibleBookGroup.PAULINE_EPISTLES,
  "Tito": BibleBookGroup.PAULINE_EPISTLES,
  "Filemom": BibleBookGroup.PAULINE_EPISTLES,
  "Hebreus": BibleBookGroup.PAULINE_EPISTLES,
  "Tiago": BibleBookGroup.GENERAL_EPISTLES,
  "1 Pedro": BibleBookGroup.GENERAL_EPISTLES,
  "2 Pedro": BibleBookGroup.GENERAL_EPISTLES,
  "1 João": BibleBookGroup.GENERAL_EPISTLES,
  "2 João": BibleBookGroup.GENERAL_EPISTLES,
  "3 João": BibleBookGroup.GENERAL_EPISTLES,
  "Judas": BibleBookGroup.GENERAL_EPISTLES,
  "Apocalipse": BibleBookGroup.REVELATION,
};

// SAMPLE DATA
// NOTE: In a production environment, this should be fetched from a large JSON file or SQLite DB.
// This is a representative subset to demonstrate functionality.
export const SAMPLE_BIBLE_DATA: BibleVerse[] = [
  { book: "Gênesis", chapter: 1, verse: 1, text: "No princípio, Deus criou os céus e a terra." },
  { book: "Gênesis", chapter: 1, verse: 2, text: "A terra estava informe e vazia; as trevas cobriam o abismo e o Espírito de Deus pairava sobre as águas." },
  { book: "Gênesis", chapter: 1, verse: 27, text: "Deus criou o homem à sua imagem; criou-o à imagem de Deus, criou-os homem e mulher." },
  
  // The Fall (Gen 3) - Requested specifically in prompt
  { book: "Gênesis", chapter: 3, verse: 14, text: "Então o Senhor Deus disse à serpente: Porquanto fizeste isto, maldita serás entre todos os animais domésticos e entre todos os animais do campo." },
  { book: "Gênesis", chapter: 3, verse: 15, text: "Porei ódio entre ti e a mulher, entre a tua descendência e a dela. Esta te ferirá a cabeça, e tu lhe ferirás o calcanhar." },
  { book: "Gênesis", chapter: 3, verse: 16, text: "Disse também à mulher: Multiplicarei os sofrimentos de teu parto; darás à luz com dores, teus desejos te impelirão para o teu marido e tu estarás sob o seu domínio." },
  { book: "Gênesis", chapter: 3, verse: 17, text: "E disse em seguida ao homem: Porque ouviste a voz de tua mulher e comeste do fruto da árvore que eu te havia proibido comer, maldita seja a terra por tua causa." },
  { book: "Gênesis", chapter: 3, verse: 18, text: "Ela te produzirá espinhos e abrolhos, e tu comerás a erva da terra." },
  { book: "Gênesis", chapter: 3, verse: 19, text: "Comerás o teu pão com o suor do teu rosto, até que voltes à terra de que foste tirado; porque és pó, e ao pó voltarás." },
  { book: "Gênesis", chapter: 3, verse: 20, text: "Adão pôs à sua mulher o nome de Eva, porque ela era a mãe de todos os viventes." },
  { book: "Gênesis", chapter: 3, verse: 21, text: "O Senhor Deus fez para Adão e sua mulher túnicas de pele e os vestiu." },

  { book: "Salmos", chapter: 23, verse: 1, text: "O Senhor é o meu pastor; nada me faltará." },
  { book: "Salmos", chapter: 23, verse: 4, text: "Ainda que eu atravesse o vale escuro, nada temerei, pois estais comigo." },
  { book: "Salmos", chapter: 51, verse: 3, text: "Compadece-te de mim, ó Deus, segundo a tua benignidade; e segundo a multidão das tuas misericórdias, apaga as minhas transgressões." },

  // Deuterocanonical Example
  { book: "Sabedoria", chapter: 1, verse: 13, text: "Deus não fez a morte, nem se alegra com a perdição dos vivos." },
  { book: "Tobias", chapter: 12, verse: 8, text: "É boa a oração acompanhada do jejum, e a esmola com a justiça." },

  { book: "Isaías", chapter: 7, verse: 14, text: "Por isso, o próprio Senhor vos dará um sinal: uma virgem conceberá e dará à luz um filho, e o chamará Deus Conosco." },
  
  { book: "Lucas", chapter: 1, verse: 28, text: "Entrando, o anjo disse-lhe: Ave, cheia de graça, o Senhor é contigo." },
  { book: "Lucas", chapter: 1, verse: 46, text: "Disse então Maria: A minha alma engrandece o Senhor." },
  
  { book: "João", chapter: 1, verse: 1, text: "No princípio era o Verbo, e o Verbo estava junto de Deus e o Verbo era Deus." },
  { book: "João", chapter: 1, verse: 14, text: "E o Verbo se fez carne e habitou entre nós, e vimos a sua glória, a glória que o Filho único recebe do seu Pai, cheio de graça e de verdade." },
  { book: "João", chapter: 3, verse: 16, text: "Com efeito, de tal modo Deus amou o mundo, que lhe deu seu Filho único, para que todo o que nele crer não pereça, mas tenha a vida eterna." },
  
  { book: "1 Coríntios", chapter: 13, verse: 13, text: "Por ora subsistem a fé, a esperança e a caridade - as três. Porém, a maior delas é a caridade." },
  { book: "Tiago", chapter: 2, verse: 26, text: "Assim como o corpo sem alma é morto, assim também a fé sem obras é morta." },
  { book: "Apocalipse", chapter: 21, verse: 4, text: "Enxugará toda lágrima de seus olhos e já não haverá morte, nem luto, nem grito, nem dor, porque passou a primeira condição." }
];