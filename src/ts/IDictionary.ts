interface IDictionaryConfiguration {
  adjectivesPath: string;
  nounsPath: string;
  maleNamesPath: string;
  femaleNamesPath: string;
}

interface IDictionary {
  adjectives: string[];
  nouns: string[];
  maleNames: string[];
  femaleNames: string[];
}

export type { IDictionary, IDictionaryConfiguration };
