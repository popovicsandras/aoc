import assert = require('assert');
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { calculate } from './calculate';

const debugData = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`;

const main = () => {
  const fileContent = readFileSync(resolve(__dirname, 'input.txt'), { encoding: 'utf8'}).trim();

  const answer0a = calculate(debugData);
  console.log(answer0a);
  assert(answer0a === 64);
}

main();

