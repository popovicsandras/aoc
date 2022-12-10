import assert = require('assert');
import { resolve } from 'path';
import readLinesFromFile from '../utils/file-reader';
import { readLinesFromString } from '../utils/string-reader';
import { process } from './process';

const debugData = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

const main = async () => {
  const stringReader = readLinesFromString(debugData);
  const [answer0a, answer0b] = await process(stringReader);
  console.log(answer0a);
  console.log(answer0b.slice(0, 21));
  assert(13140 === answer0a);
  assert('##..##..##..##..##..#' === answer0b.slice(0, 21));

  const fileName = resolve(__dirname, 'input.txt');

  let fileReader = readLinesFromFile(fileName);
  const [answer1, answer2] = await process(fileReader);
  console.log(answer1);
  console.log(answer2.slice(0,40));
  console.log(answer2.slice(40,80));
  console.log(answer2.slice(80, 120));
  console.log(answer2.slice(120, 160));
  console.log(answer2.slice(160, 200));
  console.log(answer2.slice(200, 240));
  assert(12520 === answer1);
  assert(
  '####.#..#.###..####.###....##..##..#....' +
  '#....#..#.#..#....#.#..#....#.#..#.#....' +
  '###..####.#..#...#..#..#....#.#....#....' +
  '#....#..#.###...#...###.....#.#.##.#....' +
  '#....#..#.#....#....#....#..#.#..#.#....' +
  '####.#..#.#....####.#.....##...###.####.' === answer2);
}

main();

