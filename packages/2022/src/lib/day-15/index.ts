import assert = require('assert');
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { calculate } from './calculate';
import { display } from "./display";
import { findDistressBeacon } from './find-distress-beacon';

const debugData = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

const main = () => {
  const fileContent = readFileSync(resolve(__dirname, 'input.txt'), { encoding: 'utf8'}).trim();
  display(debugData);
  const answer0a = calculate(debugData, 10);
  console.log(answer0a);
  assert(answer0a === 26);

  const answer0b = findDistressBeacon(debugData);
  console.log(answer0b);
  assert(answer0b === 56000011);

  const answer1 = calculate(fileContent, 2000000);
  console.log(answer1);
  assert(answer1 === 5525847);

  const answer2 = findDistressBeacon(fileContent);
  console.log(answer2);
  assert(answer2 === 13340867187704);
}

main();

