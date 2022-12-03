import { resolve } from 'path';
import readLinesFromFile from '../utils/file-reader';

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const priorities: any = alpha
  .map((x) => String.fromCharCode(x))
  .reduce((acc, value, index) => {
    return {
      ...acc,
      [value.toLowerCase()]: index + 1,
      [value]: index + 27
    }
  }, {});

const main = async () => {
  const fileReader = readLinesFromFile(resolve(__dirname, 'input.txt'));

  let sum = 0;
  for await (let line of fileReader) {
    let buffer = new Set();

    for (let i = 0; i < (line.length-1) / 2; i++) {
      buffer.add(line[i]);
    }

    for (let i = (line.length) / 2; i < line.length; i++) {
      if (buffer.has(line[i])) {
        sum += priorities[line[i]];
        break;
      }
    }
  }

  console.log(sum);
}

main();
