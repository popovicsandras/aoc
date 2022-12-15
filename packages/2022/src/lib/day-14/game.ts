import { CaveMap } from './cave-map';
import { CaveMapDisplay } from './cave-map-display';
import { CaveMapParser } from './cave-map-parser';

export class Game {
  stableMapState: CaveMap;

  constructor(input: string, private debug = false) {
    const caveMapParser = new CaveMapParser();
    this.stableMapState = caveMapParser.parse(input, 500, 0);
  }

  run(show = false) {
    let displayPromise: Promise<void> = Promise.resolve();
    let display: CaveMapDisplay;
    if (show) {
      display = new CaveMapDisplay();
      displayPromise = display.start();
      display.addState(this.stableMapState);
    }

    let sandCount = 0;

    let unstableMapState = this.stableMapState.clone();
    while (true) {
      unstableMapState.addGrainOfSand(500, 0);

      try {
        while (unstableMapState.isFalling()) {
          if (show) {
            display!.addState(unstableMapState);
            unstableMapState = unstableMapState.clone();
          }
        }
      } catch {
        console.log(sandCount);
        break;
      }

      unstableMapState = unstableMapState.clone(true);
      sandCount++;
    }

    return displayPromise;
  }
}
