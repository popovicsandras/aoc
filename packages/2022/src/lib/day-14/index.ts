import assert = require('assert');
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Game } from './game';

let debugData = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

const main = async () => {
  const fileContent = readFileSync(resolve(__dirname, 'input.txt'), { encoding: 'utf8'}).trim();

  const game0 = new Game(debugData);
  await game0.run(false, true);

  const game0b = new Game(debugData);
  await game0b.run(true, true);

  const game1 = new Game(fileContent);
  await game1.run();

  const game2 = new Game(fileContent);
  await game2.run(true);
}

main();

