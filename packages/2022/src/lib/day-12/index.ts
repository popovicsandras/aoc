import assert = require('assert');
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { TerrainMap } from './terrain-map';

const debugData = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`;

const main = async () => {
  const map = new TerrainMap(debugData);
  const answer0 = map.getShortestDistance();
  console.log(answer0);
  assert(answer0 === 31);

  const fileContent = readFileSync(resolve(__dirname, 'input.txt'), { encoding: 'utf8'}).trim();
  const map1 = new TerrainMap(fileContent);
  const answer1 = map1.getShortestDistance();
  console.log(answer1);
  assert(answer1 === 391);
}

main();

