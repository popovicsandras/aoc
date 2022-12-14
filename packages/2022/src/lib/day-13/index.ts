import assert = require('assert');
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Device } from './device';

const pairs = [
`[1,1,3,1,1]
[1,1,5,1,1]`,

`[[1],[2,3,4]]
[[1],4]`,

`[9]
[[8,7,6]]`,

`[[4,4],4,4]
[[4,4],4,4,4]`,

`[7,7,7,7]
[7,7,7]`,

`[]
[3]`,

`[ [ [] ] ]
[ [] ]`,

`[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`
];

let debugData = pairs.join('\n\n');

const debugData2 = `[]
[[]]
[[[]]]
[1,1,3,1,1]
[1,1,5,1,1]
[[1],[2,3,4]]
[1,[2,[3,[4,[5,6,0]]]],8,9]
[1,[2,[3,[4,[5,6,7]]]],8,9]
[[1],4]
[3]
[[4,4],4,4]
[[4,4],4,4,4]
[7,7,7]
[7,7,7,7]
[[8,7,6]]
[9]`

const main = () => {
  const fileContent = readFileSync(resolve(__dirname, 'input.txt'), { encoding: 'utf8'}).trim();
  const sampleExpectations = [1, 1, 0, 1, 0, 1, 0, 0]
  pairs.forEach((pair, index) => {
    const device = new Device(pair, false);
    assert(sampleExpectations[index] === device.findSumOfCorrectlyOrderedPackets(), `${pair.replace('\n', ' <=> ')} check failed`);
  });

  const device0 = new Device(debugData, false);
  const answer0 = device0.findSumOfCorrectlyOrderedPackets();
  console.log('answer0: ', answer0);
  assert(13 === answer0);

  const device0b = new Device(debugData, false);
  const answer0b = device0b.orderPackets();
  console.log('answerb: ', answer0b);
  assert(140 === answer0b);

  const device1 = new Device(fileContent, false);
  const answer1 = device1.findSumOfCorrectlyOrderedPackets();
  console.log('answer1: ', answer1);
  assert(6420 === answer1);

  const device2 = new Device(fileContent, false);
  const answer2 = device2.orderPackets();
  console.log('answer2: ', answer2);
  assert(22000 === answer2);
}

main();

