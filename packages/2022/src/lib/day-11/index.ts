import assert = require('assert');
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Game } from './game';

const debugData = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

const main = async () => {
  const game0 = new Game(debugData);
  const answer0 = await game0.run();
  console.log(answer0);
  assert(10605 === answer0);

  const fileContent = readFileSync(resolve(__dirname, 'input.txt'), { encoding: 'utf8'}).trim();
  const game1 = new Game(fileContent);
  const answer1 = await game1.run();
  console.log(answer1);
  assert(78678 === answer1);
}

main();

