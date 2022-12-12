
export interface NumericFunctionType {
  (num: number): number;
};

export class Monkey {
  private _operation: NumericFunctionType;
  private _targetCalculator: NumericFunctionType;
  private _inspectionCounter = 0;
  private _items: number[];

  constructor(public id: number) {
    this._operation = old => old;
    this._targetCalculator = num => num;
    this._items = [];
  }

  public *inspect(modulo: number = Infinity): Generator<[number, number], void, unknown>  {
    for (let worrinessLevel of this._items) {
      this._inspectionCounter++;
      const newWorrinessLevel = Math.floor(this._operation(worrinessLevel) % modulo);
      const target = this._targetCalculator(newWorrinessLevel);
      yield [target, newWorrinessLevel];
    }

    this._items = [];
  }

  addItems(items: number | number[]) {
    this._items = this._items.concat(items);
  }

  get inspectionCounter() {
    return this._inspectionCounter;
  }

  get items() {
    return this._items;
  }

  set operation(operation: NumericFunctionType) {
    this._operation = operation;
  }

  set targetCalculator(targetCalculator: NumericFunctionType) {
    this._targetCalculator = targetCalculator;
  }
}
