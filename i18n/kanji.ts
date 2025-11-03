import type { Kanji } from '../types';

export const KANJI_DATA: Kanji[] = [
  {
    character: '日',
    meaning: 'Day, Sun, Japan',
    onyomi: ['ニチ', 'ジツ'],
    kunyomi: ['ひ', '-び', '-か'],
    jlpt: 5,
    mnemonic: "Imagine the sun, a perfect circle with a single, defining line through it. It's the first thing you see in the day.",
    examples: [
      { word: '日本', reading: 'にほん (Nihon)', meaning: 'Japan' },
      { word: '日曜日', reading: 'にちようび (Nichiyōbi)', meaning: 'Sunday' },
      { word: '今日', reading: 'きょう (Kyō)', meaning: 'Today' },
    ],
  },
  {
    character: '一',
    meaning: 'One',
    onyomi: ['イチ', 'イツ'],
    kunyomi: ['ひと-'],
    jlpt: 5,
    mnemonic: "The easiest kanji of all! It's just one horizontal line. It represents the number one.",
    examples: [
      { word: '一日', reading: 'いちにち (Ichinichi)', meaning: 'One day' },
      { word: '一つ', reading: 'ひとつ (Hitotsu)', meaning: 'One thing' },
    ],
  },
  {
    character: '国',
    meaning: 'Country',
    onyomi: ['コク'],
    kunyomi: ['くに'],
    jlpt: 5,
    mnemonic: "A king (王) protects the country's treasure (玉 - jewel) inside a fortified box or border (囗). This represents a country.",
    examples: [
      { word: '国', reading: 'くに (Kuni)', meaning: 'Country' },
      { word: '外国', reading: 'がいこく (Gaikoku)', meaning: 'Foreign country' },
    ],
  },
  {
    character: '人',
    meaning: 'Person',
    onyomi: ['ジン', 'ニン'],
    kunyomi: ['ひと'],
    jlpt: 5,
    mnemonic: "This kanji looks like a person walking, with two legs.",
    examples: [
      { word: '日本人', reading: 'にほんじん (Nihonjin)', meaning: 'Japanese person' },
      { word: '一人', reading: 'ひとり (Hitori)', meaning: 'One person' },
    ],
  },
  {
    character: '年',
    meaning: 'Year',
    onyomi: ['ネン'],
    kunyomi: ['とし'],
    jlpt: 5,
    mnemonic: "Imagine a farmer who must bend over (the top part) to plant rice every single year. It's a cycle he repeats year after year.",
    examples: [
      { word: '今年', reading: 'ことし (Kotoshi)', meaning: 'This year' },
      { word: '来年', reading: 'らいねん (Rainen)', meaning: 'Next year' },
    ],
  },
  {
    character: '大',
    meaning: 'Big, Large',
    onyomi: ['ダイ', 'タイ'],
    kunyomi: ['おお-'],
    jlpt: 5,
    mnemonic: "A person (人) stretching their arms out wide to show how big something is. That's one big person!",
    examples: [
        { word: '大学', reading: 'だいがく (Daigaku)', meaning: 'University' },
        { word: '大きい', reading: 'おおきい (Ōkii)', meaning: 'Big' },
    ]
  },
  {
    character: '十',
    meaning: 'Ten',
    onyomi: ['ジュウ'],
    kunyomi: ['とお'],
    jlpt: 5,
    mnemonic: "A simple cross, like tally marks. After nine lines, the tenth one crosses them all to make a bundle of ten.",
    examples: [
        { word: '十年', reading: 'じゅうねん (Jūnen)', meaning: 'Ten years' },
        { word: '十', reading: 'とお (Tō)', meaning: 'Ten (things)' },
    ]
  },
  {
    character: '二',
    meaning: 'Two',
    onyomi: ['ニ'],
    kunyomi: ['ふた-'],
    jlpt: 5,
    mnemonic: "Two horizontal lines. The top one is shorter than the bottom one. Easy!",
    examples: [
        { word: '二月', reading: 'にがつ (Nigatsu)', meaning: 'February' },
        { word: '二つ', reading: 'ふたつ (Futatsu)', meaning: 'Two things' },
    ]
  },
  {
    character: '本',
    meaning: 'Book, Origin',
    onyomi: ['ホン'],
    kunyomi: ['もと'],
    jlpt: 5,
    mnemonic: "A tree (木) with a line at the bottom, indicating its roots or origin. Books are the origin of knowledge.",
    examples: [
        { word: '本', reading: 'ほん (Hon)', meaning: 'Book' },
        { word: '山本', reading: 'やまもと (Yamamoto)', meaning: 'Yamamoto (a name)' },
    ]
  },
  {
    character: '中',
    meaning: 'Middle, Inside',
    onyomi: ['チュウ'],
    kunyomi: ['なか'],
    jlpt: 5,
    mnemonic: "A box (口) with a single vertical line going right through the middle. It's in the middle of the box.",
    examples: [
        { word: '中国', reading: 'ちゅうごく (Chūgoku)', meaning: 'China' },
        { word: '中', reading: 'なか (Naka)', meaning: 'Inside' },
    ]
  }
];
