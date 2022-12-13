import { Graph } from './graph';
import { PathFinder } from './path-finder';

export class TerrainMap {
  graph: Graph;
  pathFinder: PathFinder;

  constructor(input: string) {
    this.graph = new Graph(input);
    this.pathFinder = new PathFinder(this.graph);
  }

  getShortestDistance() {
    this.pathFinder.traverse();
    return this.pathFinder.getShortestDistanceTo(this.graph.endNode);
  }
}
