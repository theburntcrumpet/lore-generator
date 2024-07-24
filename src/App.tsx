import {
  Button,
  ButtonGroup,
  Center,
  Container,
  Heading,
} from "@chakra-ui/react";
import "./App.css";
import PersonNameGenerator from "./components/person-name-generator/PersonNameGenerator";
import { IDictionaryConfiguration, IDictionary } from "./ts/IDictionary";
import { useEffect, useState } from "react";
import { GetDictionary } from "./utils/DictionaryUtils";
import TownNameGenerator from "./components/town-name-generator/TownNameGenerator";

enum Pages {
  Person,
  Town,
}

function App() {
  const [dictionary, setDictionary] = useState<IDictionary>();
  const [page, setPage] = useState<Pages>(Pages.Person);

  function getButtons() {
    return (
      <>
        <br />
        <Center>
          <ButtonGroup>
            <Button
              colorScheme={page === Pages.Person ? "blue" : "purple"}
              onClick={() => setPage(Pages.Person)}
            >
              Person Names 🧑‍🦳
            </Button>
            <Button
              colorScheme={page === Pages.Town ? "blue" : "purple"}
              onClick={() => setPage(Pages.Town)}
            >
              Town Names 🏠
            </Button>
          </ButtonGroup>
        </Center>
        <br />
      </>
    );
  }

  useEffect(() => {
    const config: IDictionaryConfiguration = {
      adjectivesPath: "/data/adjectives.txt",
      nounsPath: "/data/nouns.txt",
      maleNamesPath: "/data/names/male.txt",
      femaleNamesPath: "/data/names/female.txt",
    };
    async function initializeDict() {
      const dict = await GetDictionary(config);
      setDictionary(dict);
    }
    initializeDict();
  }, []);

  function getPage() {
    if (!dictionary) {
      return <></>;
    }
    if (page == Pages.Town) {
      return (
        <>
          <Heading>Town Name Generator</Heading>
          {getButtons()}
          <TownNameGenerator dictionary={dictionary} />
        </>
      );
    }
    return (
      <>
        <Heading>Person Name Generator</Heading>
        {getButtons()}
        <PersonNameGenerator dictionary={dictionary} />
      </>
    );
  }

  if (!dictionary) {
    return <p>Loading...</p>;
  }

  return <Container>{getPage()}</Container>;
}

export default App;
