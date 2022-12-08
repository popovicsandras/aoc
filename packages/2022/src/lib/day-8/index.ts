import assert = require('assert');
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { findHighestScenicScore } from './find-highest-scenic-score';
import { findVisibleTrees } from './find-visible-trees';

/*
    0 1 2 3 4
    ----------
0 | 3 0 3 7 3
1 | 2 5 5 1 2
2 | 6 5 3 3 2
3 | 3 3 5 4 9
4 | 3 5 3 9 0
*/
const debugData = `30373
25512
65332
33549
35390`;

const main = async () => {
  const answer0 = await findVisibleTrees(debugData);
  console.log(answer0);
  assert(21 === answer0);

  const answer0b = await findHighestScenicScore(debugData);
  console.log(answer0b);
  assert(8 === answer0b);

  const fileContent = readFileSync(resolve(__dirname, 'input.txt'), { encoding: 'utf8'}).trim();

  const answer1 = await findVisibleTrees(fileContent);
  console.log(answer1);
  assert(1676 === answer1);

  const answer2 = await findHighestScenicScore(fileContent);
  console.log(answer2);
  assert(313200 === answer2);
}

main();

