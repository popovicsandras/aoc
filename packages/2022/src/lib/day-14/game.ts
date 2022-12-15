import { Map } from './map';

export class Game {
  constructor(input: string, private debug = false) {
    const map = Map.parseFrom(input);
  }

  run() {
  }
}
