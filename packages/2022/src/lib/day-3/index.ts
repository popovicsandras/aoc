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

const findBadgeValue = (uniquItemsInSacks: any[], lineNumber: number) => {
  const elf1Sack: any = '0b' + uniquItemsInSacks[lineNumber-3].join('');
  const elf2Sack: any = '0b' + uniquItemsInSacks[lineNumber-2].join('');
  const elf3Sack: any = '0b' + uniquItemsInSacks[lineNumber-1].join('');
  const index: any = BigInt(elf1Sack) & BigInt(elf2Sack) & BigInt(elf3Sack);
  return alpha.length*2 - BigInt(index).toString(2).length + 1
}

const main = async () => {
  const fileReader = readLinesFromFile(resolve(__dirname, 'input.txt'));

  let sum = 0;
  let badgeSum = 0;
  let lineNumber = 0
  let uniquItemsInSacks: any = [];

  for await (let line of fileReader) {
    uniquItemsInSacks[lineNumber] = Array(alpha.length*2).fill(0);
    let buffer = new Set();

    for (let i = 0; i < (line.length-1) / 2; i++) {
      uniquItemsInSacks[lineNumber][priorities[line[i]]-1] = 1;
      buffer.add(line[i]);
    }

    for (let i = (line.length) / 2; i < line.length; i++) {
      uniquItemsInSacks[lineNumber][priorities[line[i]]-1] = 1;

      if (buffer.has(line[i])) {
        sum += priorities[line[i]];
        // break; // Makes sense only for the first part for perf optimisation
      }
    }

    if ((lineNumber % 3 === 0) && (lineNumber > 0)) {
      badgeSum += findBadgeValue(uniquItemsInSacks, lineNumber);
    }

    lineNumber++;
  }

  badgeSum += findBadgeValue(uniquItemsInSacks, lineNumber);

  console.log('Part 1:', sum);
  console.log('Part 2:', badgeSum);
}

main();
