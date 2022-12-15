import assert = require('assert');
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Game } from './game';

let debugData = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

const main = async () => {
  const fileContent = readFileSync(resolve(__dirname, 'input.txt'), { encoding: 'utf8'}).trim();

  const map0 = new Game(debugData);
  await map0.run();
  // console.log('answer0: ', answer0);
  // assert(24 === answer0);

  const map1 = new Game(fileContent);
  await map1.run();
  // console.log('answer0: ', answer1);

}

main();

