import { IDictionary, IDictionaryConfiguration } from "../ts/IDictionary";
import { ReadFileToArray } from "../utils/TxtUtils";
async function GetDictionary(
  config: IDictionaryConfiguration
): Promise<IDictionary> {
  return {
    adjectives: await ReadFileToArray(config.adjectivesPath),
    nouns: await ReadFileToArray(config.nounsPath),
    maleNames: await ReadFileToArray(config.maleNamesPath),
    femaleNames: await ReadFileToArray(config.femaleNamesPath),
  };
}

export { GetDictionary };
