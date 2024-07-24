import { useCallback, useEffect, useState } from "react";
import { IDictionary } from "../../ts/IDictionary";
import { GenerateWord, GeneratorToken } from "../../utils/Generator";
import { Button, Heading } from "@chakra-ui/react";

interface Props {
  dictionary: IDictionary;
}
export default function TownNameGenerator(props: Props) {
  const [name, setName] = useState<string>("");
  const getName = useCallback(() => {
    const tokens = [GeneratorToken.Noun, GeneratorToken.Noun];
    return GenerateWord(tokens, props.dictionary);
  }, [props.dictionary]);

  useEffect(() => {
    setName(getName());
  }, [getName]);

  return (
    <>
      <Heading size="md">{name}</Heading>
      <br />
      <Button
        colorScheme="blue"
        onClick={() => {
          setName(getName());
        }}
      >
        Refresh
      </Button>
    </>
  );
}
