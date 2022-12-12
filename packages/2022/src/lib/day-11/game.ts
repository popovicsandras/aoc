import { GameInputParser } from "./game-input-parser";
import { Monkey } from "./monkey";

export class Game {
  monkeys: { [key: string]: Monkey };
  parser: GameInputParser;
  modulo: number;

  constructor(input: string, private verbose = false) {
    this.parser = new GameInputParser(input);
    const [monkeys, modulo] = this.parser.parse();
    this.monkeys = monkeys.reduce((acc, monkey) => ({...acc, [monkey.id]: monkey}), {});
    this.modulo = modulo * 3;
  }

  async run(rounds = 20) {
    const monkeyIds = Object.keys(this.monkeys);

    for (let round = 0; round < rounds; round++) {
      for (const monkeyId of monkeyIds) {
        for (const [target, newWorrinessLevel] of this.monkeys[monkeyId].inspect(this.modulo)) {
          this.monkeys[target].addItems(newWorrinessLevel);
        }
      }

      if (this.verbose) {
        console.log(`After round ${round + 1}, the monkeys are holding items with these worry levels:`)
        monkeyIds
          .map(monkeyId => this.monkeys[monkeyId])
          .forEach(monkey => {
            console.log(`Monkey ${monkey.id}: ${monkey.items}`)
          });
      }
    }

    const inspectionCountsByMonkeys = monkeyIds
      .map(monkeyId => this.monkeys[monkeyId])
      .map(monkey => monkey.inspectionCounter)
      .sort((a: number, b: number) => b-a);
    return inspectionCountsByMonkeys[0] * inspectionCountsByMonkeys[1];
  }
}
