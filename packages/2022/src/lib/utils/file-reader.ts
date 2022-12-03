import { createReadStream } from "fs";
import * as readline from 'readline';

export default async function* readLinesFromFile(filePath: string) {
  const fileStream = createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    yield line;
  }
}
