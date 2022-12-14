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
    return this.pathFinder.traverse(this.graph.startNode, this.graph.endNode);
  }

  getShortestDistanceFromGroundLevel() {
    const groundLevelNodes = this.graph.getNodesWithHeight(0);

    const routesFromGround = groundLevelNodes.map(node => this.pathFinder.traverse(node, this.graph.endNode)).sort()
    return routesFromGround[0];
  }
}
