import { Graph } from "./graph";
import { Node } from './node';

interface PathInfo {
  distance: number;
  previous: Node | null;
}

export class PathFinder {
  private visited!: Set<Node>;
  private unvisited!: Set<Node>;
  private distanceMap!: Map<Node, PathInfo>;

  constructor(private graph: Graph) {}

  init(startNode: Node) {
    this.visited = new Set();
    this.distanceMap = new Map();
    this.unvisited = this.graph.getNodes();

    this.unvisited.forEach(node => {
      this.distanceMap.set(node, {
        distance: node === startNode ? 0 : Infinity,
        previous: null
      });
    });
  }

  traverse(startNode: Node, endNode: Node):number {
    this.init(startNode);

    let currentNode = this.getLowestDistanceNode();
    while (this.unvisited.size > 0 && currentNode !== undefined) {
      const neighbours = currentNode.getNeightBours().filter(neighbourNode => !this.visited.has(neighbourNode));

      neighbours.forEach(neightbourNode => {
          const currentDistance = this.getDistanceOf(currentNode) + 1;
          if (currentDistance <= this.getDistanceOf(neightbourNode)) {
            this.updateDistanceMap(neightbourNode, currentDistance, currentNode);
          }
        });

      this.unvisited.delete(currentNode);
      this.visited.add(currentNode);
      currentNode = this.getLowestDistanceNode();
    }

    return this.distanceMap.get(endNode)!.distance;
  }

  private getDistanceOf(node: Node): number {
    return this.distanceMap.get(node)!.distance;
  }

  private updateDistanceMap(node: Node, distance: number, previous: Node): void {
    this.distanceMap.set(node, {
      distance,
      previous
    });
  }

  private getLowestDistanceNode(): Node {
    let lowestDistanceNode: Node;
    let lowestDistance = Infinity;

    this.unvisited.forEach(node => {
      const distance = this.getDistanceOf(node);
      if (distance < lowestDistance) {
        lowestDistance = distance;
        lowestDistanceNode = node;
      }
    });

    return lowestDistanceNode!;
  }
}
