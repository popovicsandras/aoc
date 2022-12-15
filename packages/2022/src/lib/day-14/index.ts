import assert = require('assert');
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Game } from './game';

let debugData = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

const main = () => {
  const fileContent = readFileSync(resolve(__dirname, 'input.txt'), { encoding: 'utf8'}).trim();

  const map0 = new Game(debugData, false);
  const answer0 = map0.run();
  console.log('answer0: ', answer0);
  // assert(13 === answer0);
}

main();

