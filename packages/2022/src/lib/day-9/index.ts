import assert = require('assert');
import { readLinesFromString } from '../utils/string-reader';
import { resolve } from 'path';
import { Board } from './board';
import readLinesFromFile from '../utils/file-reader';

const debugData = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const main = async () => {
  const stringReader = readLinesFromString(debugData);
  const board0 = new Board(2);
  await board0.simulate(stringReader);
  const answer0 = board0.getTailFootprint();
  console.log(answer0);
  assert(13 === answer0);

  const fileName = resolve(__dirname, 'input.txt');

  let fileReader = readLinesFromFile(fileName);
  const board1 = new Board(2);
  await board1.simulate(fileReader);
  const answer1 = board1.getTailFootprint();
  console.log(answer1);
  assert(6337 === answer1);
}

main();

