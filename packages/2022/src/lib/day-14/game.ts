import { CaveMap } from './cave-map';
import { MapObjectType } from "./cave-map-parser";

class CaveMapDisplay {
  constructor(private caveMap: CaveMap) {}

  render() {
    const grid: string[][]  = [];
    for (let y = this.caveMap.top; y <= this.caveMap.bottom; y++) {
      const row: string[] = [];
      grid.push(row);
      for (let x = this.caveMap.left; x <= this.caveMap.right; x++) {
        row.push(this.caveMap.display(x, y));
      }
      console.log(row.join(''))
    }
  }
}

export class Game {
  constructor(input: string, private debug = false) {
    const map = CaveMap.parseFrom(input, 500, 0);
    console.log(map.width);
    console.log(map.height);
    const display = new CaveMapDisplay(map);
    display.render();
  }

  run() {
  }
}
