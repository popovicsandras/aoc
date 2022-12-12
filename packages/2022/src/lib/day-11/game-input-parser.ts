import { Monkey, NumericFunctionType } from "./monkey";

const NEW_MONKEY = /Monkey (\d*):/;
const ITEMS = /Starting items: (.*)/;
const OPERATION = /Operation: new = old ([+*]) ([\d]*o?l?d?)/;
const THROW_TARGET_PREDICATE = /Test: divisible by (\d*)/;
const THROW_TARGET_IF_TRUE = /If true: throw to monkey (\d*)/;
const THROW_TARGET_IF_FALSE = /If false: throw to monkey (\d*)/;


export class GameInputParser {

  monkeys: Monkey[] = [];
  monkeyCursor = 0;

  constructor(private input: string) { }

  parse(): [Monkey[], number] {

    const inputLines = this.input.split('\n');
    let modulo = 1;

    let index = 0;
    while (inputLines[index] !== undefined) {
      let increment = 1;
      const line = inputLines[index];

      if (NEW_MONKEY.test(line)) {
        this.monkeys[this.monkeyCursor] = new Monkey(this.extractMonkeyId(line));
      } else if (ITEMS.test(line)) {
        this.monkeys[this.monkeyCursor].addItems(this.extractItems(line));
      } else if (OPERATION.test(line)) {
        this.monkeys[this.monkeyCursor].operation = this.extractOperation(line);
      } else if (THROW_TARGET_PREDICATE.test(line)) {
        const [divisibleBy, targetCalculator] = this.extractTargetCalculator(line, inputLines, index);
        modulo *= divisibleBy;
        this.monkeys[this.monkeyCursor].targetCalculator = targetCalculator;
        increment = 3;
      } else if (line.trim() === '') {
        this.monkeyCursor++;
      }

      index += increment;
    }

    return [this.monkeys, modulo];
  }

  private extractTargetCalculator(line: string, inputLines: string[], index: number): [number, NumericFunctionType] {
    const divisibleBy = parseInt(line.match(THROW_TARGET_PREDICATE)?.[1] ?? '', 10);
    const trueTarget = parseInt(inputLines[index + 1].match(THROW_TARGET_IF_TRUE)?.[1] ?? '', 10);
    const falseTarget = parseInt(inputLines[index + 2].match(THROW_TARGET_IF_FALSE)?.[1] ?? '', 10);

    return [divisibleBy, (worrinessLevel: number) => worrinessLevel % divisibleBy === 0 ? trueTarget : falseTarget];
  }

  private extractMonkeyId(line: string) {
    return parseInt(line.match(NEW_MONKEY)?.[1] ?? '', 10);
  }

  private extractItems(line: string) {
    return (line.match(ITEMS)?.[1] ?? '').split(', ').map(item => parseInt(item, 10));
  }

  private extractOperation(line: string): NumericFunctionType {
    let operation: NumericFunctionType;
    const operationParts = line.match(OPERATION);

    if (operationParts?.[2] === 'old') {
      operation = (old: number) => old ** 2;
    } else if (operationParts?.[1] === '+') {
      operation = (old: number) => old + parseInt(operationParts?.[2], 10);
    } else if (operationParts?.[1] === '*') {
      operation = (old: number) => old * parseInt(operationParts?.[2], 10);
    } else {
      operation = old => old;
    }

    return operation;
  }
}
