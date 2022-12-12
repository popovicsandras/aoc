import assert = require('assert');
import { readFileSync } from 'fs';
import { resolve } from 'path';

class TarrainMap {
  constructor(private input: string) {
    console.log(input);
  }
}

const debugData = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`;

const main = async () => {
  const map = new TarrainMap(debugData);

  const fileContent = readFileSync(resolve(__dirname, 'input.txt'), { encoding: 'utf8'}).trim();
}

main();

