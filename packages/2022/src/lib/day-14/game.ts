import { CaveMap } from './cave-map';
import { CaveMapDisplay } from './cave-map-display';
import { CaveMapParser } from './cave-map-parser';
import { CaveMapPointType } from './cave-map-point';

export class Game {
  stableMapState: CaveMap;

  constructor(input: string, private debug = false) {
    const caveMapParser = new CaveMapParser();
    this.stableMapState = caveMapParser.parse(input, 500, 0);
  }

  run() {
    const display = new CaveMapDisplay();
    const displayPromise = display.start();

    display.addState(this.stableMapState);
    const sandCount = 0;
    const movingMap = this.stableMapState.clone();
    // movingMap.addSand(500, 0);
    // while (movingMap.unstable) {

    // }
    return displayPromise;
  }
}
