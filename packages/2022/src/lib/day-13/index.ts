import assert = require('assert');
import { readFileSync } from 'fs';
import { resolve } from 'path';

class Device {
  constructor(input: string) {

  }

  findSumOfCorrectlyOrderedPackets() {
    return 0;
  }
}

const debugData = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

const main = () => {
  const game0 = new Device(debugData);
  const answer0 = game0.findSumOfCorrectlyOrderedPackets();
  console.log(answer0);
  // assert(13 === answer0);

  const fileContent = readFileSync(resolve(__dirname, 'input.txt'), { encoding: 'utf8'}).trim();
}

main();

