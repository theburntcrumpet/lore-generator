import {
  Button,
  Center,
  Heading,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { IDictionary } from "../../ts/IDictionary";
import { useCallback, useEffect, useState } from "react";
import { GenerateWord, GeneratorToken } from "../../utils/Generator";

interface Props {
  dictionary: IDictionary;
}

enum Gender {
  Male,
  Female,
}

interface IOptions {
  gender: Gender;
}

export default function PersonNameGenerator(props: Readonly<Props>) {
  const stringGenderMap = new Map<string, Gender>([
    ["male", Gender.Male],
    ["female", Gender.Female],
  ]);

  const genderStringMap = Array.from(stringGenderMap.entries()).reduce(
    (acc, [key, value]) => {
      acc.set(value, key);
      return acc;
    },
    new Map()
  );
  const [options, setOptions] = useState<IOptions>({ gender: Gender.Male });
  const [name, setName] = useState<string>("");

  const getName = useCallback(
    (gender: Gender) => {
      const commonTokens = [
        GeneratorToken.Space,
        GeneratorToken.Adjective,
        GeneratorToken.Noun,
      ];
      const tokens = [
        gender === Gender.Male
          ? GeneratorToken.MaleName
          : GeneratorToken.FemaleName,
        ...commonTokens,
      ];
      return GenerateWord(tokens, props.dictionary);
    },
    [props.dictionary]
  );

  useEffect(() => {
    setName(getName(options.gender));
  }, [options.gender, getName]);

  function setGender(gender: string) {
    const genderValue = stringGenderMap.get(gender);
    if (genderValue === undefined) return;
    setOptions({ ...options, gender: genderValue });
  }

  return (
    <>
      <Center>
        <RadioGroup
          onChange={setGender}
          value={genderStringMap.get(options.gender) || "male"}
        >
          <Stack direction="row">
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Stack>
        </RadioGroup>
      </Center>
      <br />
      <Heading size="md">{name}</Heading>
      <br />
      <Button
        colorScheme="blue"
        onClick={() => {
          setName(getName(options.gender));
        }}
      >
        Refresh
      </Button>
    </>
  );
}
