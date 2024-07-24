import { IDictionary } from "../ts/IDictionary";

enum GeneratorToken {
  Unknown,
  Adjective,
  Noun,
  MaleName,
  FemaleName,
  Space,
}

function GetRandomWord(words: string[]): string {
  return words[Math.floor(Math.random() * words.length)];
}

function CapitalizeFirstLetter(word: string): string {
  if (word.length === 0) return "";
  return word.charAt(0).toUpperCase() + word.slice(1, word.length);
}

function GenerateWord(
  tokens: GeneratorToken[],
  dictionary: IDictionary
): string {
  return tokens
    .map((token) => {
      switch (token) {
        case GeneratorToken.Unknown:
          return "";
        case GeneratorToken.Adjective:
          return GetRandomWord(dictionary.adjectives);
        case GeneratorToken.Noun:
          return GetRandomWord(dictionary.nouns);
        case GeneratorToken.MaleName:
          return GetRandomWord(dictionary.maleNames);
        case GeneratorToken.FemaleName:
          return GetRandomWord(dictionary.femaleNames);
        case GeneratorToken.Space:
          return " ";
      }
    })
    .join("")
    .split(" ")
    .map(CapitalizeFirstLetter)
    .join(" ");
}

export { GenerateWord, GeneratorToken };
