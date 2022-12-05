import { resolve } from 'path';
import readLinesFromFile from '../utils/file-reader';

enum PARSE_STAGE {
  CRATES = 'CRATES',
  COMMANDS = 'COMMANDS'
}

enum CRATEMOVER {
  TYPE_9000 = '9000',
  TYPE_9001 = '9001'
}

const main = async (crateMover: CRATEMOVER) => {
  const fileReader = readLinesFromFile(resolve(__dirname, 'input.txt'));

  let parseStage: PARSE_STAGE = PARSE_STAGE.CRATES;

  const cratesContainer: Array<Array<string>> = [];

  for await (let line of fileReader) {
    if (line.trim() === '')
    {
      cratesContainer.forEach((column => column.reverse()));
      parseStage = PARSE_STAGE.COMMANDS;
      continue;
    }

    if (parseStage === PARSE_STAGE.CRATES) {
      const crates = line.match(/.{1,4}/g) ?? [];
      crates.forEach((element, index) => {
        const crate = element.trim();
        if (crate !== '' && +crate !== parseInt(crate, 10)) {
          if (!cratesContainer[index]) {
            cratesContainer[index] = [];
          }
          cratesContainer[index].push(crate.replace(/[\[\]]/g, ''));
        }
      });
    } else {
      const commandParams = [...line.matchAll(/move ([\d]*) from ([\d]*) to ([\d]*)/g)][0];
      const count = parseInt(commandParams[1], 10);
      const from = parseInt(commandParams[2], 10) - 1;
      const to = parseInt(commandParams[3], 10) - 1;

      const cratesToMove = []
      for (let i = 0; i < count; i++) {
        const crate = cratesContainer[from].pop()!;
        cratesToMove.push(crate);
      }

      if (crateMover === CRATEMOVER.TYPE_9001) {
        cratesToMove.reverse();
      }

      cratesContainer[to] = cratesContainer[to].concat(cratesToMove);
    }
  }

  const result = cratesContainer.reduce((acc, element) => {
    return acc + element[element.length - 1];
  }, '');

  console.log(result);
}

main(CRATEMOVER.TYPE_9000);
main(CRATEMOVER.TYPE_9001);
