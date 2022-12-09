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

const debugData2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

const main = async () => {
  let stringReader = readLinesFromString(debugData);
  const board0 = new Board(2);
  await board0.simulate(stringReader);
  const answer0 = board0.getTailFootprint();
  console.log(answer0);
  assert(13 === answer0);

  stringReader = readLinesFromString(debugData);
  const board0b = new Board(10);
  await board0b.simulate(stringReader);
  const answer0b = board0b.getTailFootprint();
  console.log(answer0b);
  assert(1 === answer0b);

  stringReader = readLinesFromString(debugData2);
  const board0c = new Board(10);
  await board0c.simulate(stringReader);
  const answer0c = board0c.getTailFootprint();
  console.log(answer0c);
  assert(36 === answer0c);


  const fileName = resolve(__dirname, 'input.txt');

  let fileReader = readLinesFromFile(fileName);
  const board1 = new Board(2);
  await board1.simulate(fileReader);
  const answer1 = board1.getTailFootprint();
  console.log(answer1);
  assert(6337 === answer1);

  fileReader = readLinesFromFile(fileName);
  const board2 = new Board(10);
  await board2.simulate(fileReader);
  const answer2 = board2.getTailFootprint();
  console.log(answer2);
  assert(2455 === answer2);
}

main();

