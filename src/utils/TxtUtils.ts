async function ReadFileToArray(filename: string): Promise<string[]> {
  return fetch(filename)
    .then((response) => response.text())
    .then((fileContents) => fileContents.split("\n"));
}

export { ReadFileToArray };
