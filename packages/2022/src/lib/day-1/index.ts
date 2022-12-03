import { resolve } from 'path';
import readLinesFromFile from '../utils/file-reader';

const main = async () => {
  const fileReader = readLinesFromFile(resolve(__dirname, 'input.txt'));

  let max = [0, 0, 0];
  let counter = 0;
  for await (let line of fileReader) {
    if (line.trim() === '') {
      for (let i = 0; i < max.length; i++){
        if (counter > max[i]) {
          max[i] = counter;
          break;
        }
      }
      counter = 0;
    } else {
      counter += parseInt(line, 10);
    }
  }
  console.log(max[0]);
  console.log(max[0] + max[1] + max[2]);
}

main();
