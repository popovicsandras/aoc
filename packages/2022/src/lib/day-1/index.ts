import assert = require('assert');
import { resolve } from 'path';
import readLinesFromFile from '../utils/file-reader';
import { process } from './process';

const main = async () => {
  const fileName = resolve(__dirname, 'input.txt');

  let fileReader = readLinesFromFile(fileName);
  const answer1 = await process(fileReader);
  console.log(answer1);
  assert(71124 === answer1);

  fileReader = readLinesFromFile(fileName);
  const answer2 = await process(fileReader, 3);
  console.log(answer2);
  assert(204639 === answer2);
}

main();

