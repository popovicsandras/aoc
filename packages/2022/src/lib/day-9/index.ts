import assert = require('assert');
import { readFileSync } from 'fs';
import { resolve } from 'path';

const debugData = ``;

const main = async () => {
  // const answer0 = await findVisibleTrees(debugData);
  // console.log(answer0);
  // assert(21 === answer0);

  const fileContent = readFileSync(resolve(__dirname, 'input.txt'), { encoding: 'utf8'}).trim();
}

main();

