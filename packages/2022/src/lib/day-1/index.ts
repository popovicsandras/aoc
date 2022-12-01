import { resolve } from 'path';
import { createReadStream } from "fs";
import * as readline from 'readline';

async function processLineByLine() {
  let max = [0, 0, 0];
  const fileStream = createReadStream(resolve(__dirname, 'input.txt'));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let counter = 0;
  for await (const line of rl) {
    if (line.trim() === '') {
      for (let i = 0; i < max.length; i++){
        if (counter > max[i]) {
          max[i] = counter;
          console.log(`Reset: ${max}`);
          break;
        }
      }
      counter = 0;
    } else {
      counter += parseInt(line, 10);
    }
  }

  console.log(max[0] + max[1] + max[2]);
}

processLineByLine();
