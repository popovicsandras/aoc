import { readFileSync } from 'fs';
import { resolve } from 'path';

const main = async (identifierLength: number) => {
  const fileContent = readFileSync(resolve(__dirname, 'input.txt'), { encoding: 'utf8'}).trim();
  const chars = fileContent.split('');
  let index;

  for (let i=0; i < chars.length - identifierLength; i++) {
    const set = new Set();
    for (let j = i; j < i + identifierLength; j++) {
      set.add(chars[j]);
    }

    if (set.size === identifierLength) {
      index = i + identifierLength;
      break;
    }
  }

  console.log(index);
}

main(4);
main(14);
