import assert = require('assert');
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { CaveMap } from './cave-map';
import { CaveMapDisplay } from './cave-map-display';
import { Game } from './game';

let debugData = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

const main = async () => {
  const fileContent = readFileSync(resolve(__dirname, 'input.txt'), { encoding: 'utf8'}).trim();

  const display0 = new CaveMapDisplay();
  const game0 = new Game(debugData);
  game0.on('stateChange', (state: CaveMap) => display0.addState(state) )
  const answer0 = game0.run(false);
  console.log(answer0);
  assert(answer0 === 24);
  await display0.start();
  console.log('\n---------------------');

  const display0b = new CaveMapDisplay();
  const game0b = new Game(debugData);
  game0b.on('stateChange', (state: CaveMap) => display0b.addState(state) )
  const answer0b = game0b.run(true);
  console.log(answer0b);
  assert(answer0b === 93);
  await display0b.start();
  console.log('\n---------------------');

  const game1 = new Game(fileContent);
  const answer1 = game1.run();
  console.log(answer1);
  assert(answer1 === 888);

  const game2 = new Game(fileContent);
  const answer2 = game2.run(true);
  console.log(answer2);
  assert(answer2 === 26461);
}

main();

