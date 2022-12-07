export async function* readLinesFromString(fileContent: string) {
  const contentByLine = fileContent.split('\n');
  for (const line of contentByLine) {
    if (line === null) {
      return;
    }
    yield line;
  }
}
