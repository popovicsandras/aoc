import { CaveMapParser } from './cave-map-parser';
import { EventEmitter } from 'events';

export class Game extends EventEmitter {
  private caveMapParser: CaveMapParser;

  constructor(private input: string) {
    super();
    this.caveMapParser = new CaveMapParser();
  }

  run(finite = false, sandSourceX = 500, sandSourceY = 0) {
    let mapState = this.caveMapParser.parse(this.input, sandSourceX, sandSourceY);
    if (finite) mapState.addGroundFloor();
    this.emit('stateChange', mapState);

    let sandCount = 0;
    let outIntOAbyss = false;
    let reachedSource = false;

    while (!outIntOAbyss && !reachedSource) {
      mapState.addGrainOfSand(sandSourceX, sandSourceY);
      ({outIntOAbyss, reachedSource} = mapState.calculateGrainOfSandDestination());
      mapState = mapState.clone(true);
      this.emit('stateChange', mapState);

      if (outIntOAbyss) {
        break;
      }

      sandCount++;

      if (reachedSource) {
        break;
      }
    }

    return sandCount;
  }
}
