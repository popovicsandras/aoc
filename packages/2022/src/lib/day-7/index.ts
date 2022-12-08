import assert = require('assert');
import { resolve } from 'path';
import readLinesFromFile from '../utils/file-reader';
import { readLinesFromString } from '../utils/string-reader';
import { process } from './process';

const debugData = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const main = async () => {
  const stringReader = readLinesFromString(debugData);
  const answer0 = await process(stringReader, 1);
  console.log(answer0);
  assert(95437 === answer0);

  const fileName = resolve(__dirname, 'input.txt');

  let fileReader = readLinesFromFile(fileName);
  const answer1 = await process(fileReader, 1);
  console.log(answer1);
  assert(1367870 === answer1);

  fileReader = readLinesFromFile(fileName);
  const answer2 = await process(fileReader, 2);
  console.log(answer2);
  assert(549173 === answer2);
}

main();

