import { CaveMap } from './cave-map';

export class CaveMapDisplay {
  private renderingInterval: NodeJS.Timer | null = null;
  private renderedAlready = false;

  private bufferIndex = 0;
  private buffer: CaveMap[];

  constructor() {
    this.buffer = [];
  }

  render(caveMap: CaveMap, cursorPosition: [number, number] | null  = null) {
    const grid: string[][] = [];
    for (let y = caveMap.top; y <= caveMap.bottom; y++) {
      const row: string[] = [];
      grid.push(row);
      for (let x = caveMap.left; x <= caveMap.right; x++) {
        row.push(caveMap.display(x, y));
      }
    }

    if (cursorPosition) {
      process.stdout.moveCursor(cursorPosition[0], cursorPosition[1]);
    }

    const output = `${grid.map(row => row.join('')).join('\n')}`;
    process.stdout.write(output);
  }

  public addState(caveMap: CaveMap) {
    this.buffer.push(caveMap);
  }

  start() {
    return new Promise((resolve, reject) => {
      this.renderingInterval = setInterval(() => {
        if (this.bufferIndex >= this.buffer.length) {
          this.stop(resolve);
          return;
        }

        const caveMap: CaveMap = this.buffer[this.bufferIndex];

        let cursorPosition = null;
        if (this.renderedAlready) {
          cursorPosition = [-caveMap.width, -(caveMap.height-1)] as [number, number];
        }

        this.render(caveMap, cursorPosition);
        this.renderedAlready = true;
        this.bufferIndex++;
      }, 300);
    });
  }

  stop(resolve: (value: any) => void) {
    this.renderingInterval && clearInterval(this.renderingInterval);
    resolve(true);
  }
}
