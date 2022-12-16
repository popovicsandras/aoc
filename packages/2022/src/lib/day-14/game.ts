import { CaveMap } from './cave-map';
import { CaveMapDisplay } from './cave-map-display';
import { CaveMapParser } from './cave-map-parser';

export class Game {
  private caveMapParser: CaveMapParser;

  constructor(private input: string) {
    this.caveMapParser = new CaveMapParser();
  }

  run(finite = false, show = false) {
    let displayPromise: Promise<void> = Promise.resolve();
    let display: CaveMapDisplay;
    let mapState = this.caveMapParser.parse(this.input, 500, 0);

    if (finite) {
      mapState.addGroundFloor();
    }

    if (show) {
      display = new CaveMapDisplay();
      displayPromise = display.start();
      display.addState(mapState);
    }

    let sandCount = 0;
    let outIntOAbyss = false;
    let reachedSource = false;

    while (!outIntOAbyss && !reachedSource) {
      mapState.addGrainOfSand(500, 0);

      ({outIntOAbyss, reachedSource} = mapState.isFalling());
      if (show) {
        display!.addState(mapState);
      }

      if (outIntOAbyss) {
        console.log('out into abyss: ', sandCount);
      }

      if (reachedSource) {
        console.log('reached source: ', sandCount+1);
      }

      mapState = mapState.clone(true);
      sandCount++;
    }

    return displayPromise;
  }
}
