import { resolve } from 'path';
import readLinesFromFile from '../utils/file-reader';

const main = async () => {
  const fileReader = readLinesFromFile(resolve(__dirname, 'input.txt'));

  for await (let line of fileReader) {
    console.log(line);
  }
}

main();
