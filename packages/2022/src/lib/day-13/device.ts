type Signal = number | Signal[];
export class Device {
  pairs: [Signal[], Signal[]][];

  constructor(input: string, private debug = false) {
    this.pairs = input
      .split('\n\n')
      .map(pair => pair
        .split('\n')
        .map(eval) as [Signal[], Signal[]]
      );
  }

  log(...args: any[]) {
    this.debug && console.log(...args);
  }

  arrayify(s: Signal) {
    return Array.isArray(s) ? s : [s];
  }

  compare(a: Signal, b: Signal, padding: string): number {
    if (Number.isInteger(a) && Number.isInteger(b)) {
      this.log(`${padding}- Compare `, a, `vs`, b);
      if (a < b) return 1;
      else if (a > b) return -1;
      else return 0;
    }

    a = this.arrayify(a);
    b = this.arrayify(b);

    this.log(`${padding}- Compare `, a, `vs`, b);
    for (var i = 0; i < Math.max(a.length,b.length); i++) {
      if (a[i] === undefined) {
        return 1;
      } else if (b[i] === undefined) {
        return -1;
      }
      const comparison = this.compare(a[i], b[i], `  ${padding}`);
      this.log(`${padding}${comparison}`);

      if (comparison === 1) return 1;
      else if (comparison === -1) return -1
    }

    return 0;
  }

  findSumOfCorrectlyOrderedPackets() {
    return this.pairs.reduce((acc: number, pair, index) => {
      const [a, b] = pair;
      const isInRightOrder = this.compare(a, b, '');

      if (isInRightOrder === 1) {
        return acc + index + 1;
      }

      return acc;
    }, 0);
  }
}
