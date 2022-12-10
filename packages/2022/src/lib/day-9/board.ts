import { calculateTailPosition, Position } from "./tail-position-calculator";

const directionMap = {
  R: { coordinate: 'x', inc: 1 },
  L: { coordinate: 'x', inc: -1 },
  U: { coordinate: 'y', inc: 1 },
  D: { coordinate: 'y', inc: -1 }
}

export class Board {
  private knots: Position[];
  private tailFootprint: Set<string>;

  private get head(): Position {
    return this.knots[0];
  }

  private get tail(): Position {
    return this.knots[this.knots.length - 1];
  }

  constructor(knots: number) {
    this.knots = [...Array(knots)].map(() => ({x: 0, y: 0}));
    this.tailFootprint = new Set();
    this.recordTailFootprint();
  }

  async simulate(dataStream: AsyncGenerator<string, void, unknown>): Promise<void> {
    for await (let line of dataStream) {
      const [direction, steps] = line.split(' ') as [keyof typeof directionMap, string];

      for (let i = 0; i < parseInt(steps, 10); i++) {
        const coord = directionMap[direction].coordinate as keyof Position;
        this.head[coord] += directionMap[direction].inc;

        for (let j=0; j < this.knots.length -1; j++) {
          this.knots[j+1] = calculateTailPosition(this.knots[j], this.knots[j+1]);
        }
        this.recordTailFootprint();
      }
    }
  }

  recordTailFootprint(): void {
    this.tailFootprint.add(`${this.tail.x}-${this.tail.y}`);
  }

  getTailFootprint(): number {
    return this.tailFootprint.size;
  }
}
