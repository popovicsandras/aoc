import { Node } from './node';

export class Graph {
  private _endNode!: Node;
  private _startNode!: Node;
  width: number;
  height: number;
  private nodes: Node[];

  constructor(input: string) {
    const inputArray = input.trim().split('\n');
    this.width = inputArray[0].length;
    this.height = inputArray.length;
    this.nodes = inputArray
      .join('')
      .split('')
      .map((char, index) => new Node(char, index % this.width, Math.floor(index / this.width)));

    this.nodes.forEach(node => {
      if (node.name === 'E') {
        this._endNode = node;
      }
      if (node.name === 'S') {
        this._startNode = node;
      }
      node.addNeighbours(this.getAccessibleNeighbours(node));
    });
  }

  get startNode(): Node {
    return this._startNode;
  }

  get endNode(): Node {
    return this._endNode;
  }

  getNodes(): Set<Node> {
    return new Set(this.nodes);
  }

  getNodesWithHeight(height: number): Node[] {
    return this.nodes.filter(node => node.height === height);
  }

  private getAccessibleNeighbours(node: Node): Node[] {
    const everyNeighbour: [number, number][] = [
                          [node.x, node.y - 1],
    [node.x - 1, node.y],       /* node */      [node.x + 1, node.y],
                          [node.x, node.y + 1]
    ];

    const accessibleNeighbours = everyNeighbour
      .filter(([x, y]) => this._getNode(x, y) !== undefined )
      .filter(([x, y]) => this._getNode(x, y).height <= node.height + 1)
      .map(([x, y]) => this._getNode(x, y));

      return accessibleNeighbours;
  }

  _getNode (x: number, y: number) {
    return this.nodes[y * this.width + x]
  }

  get(node: Node) {
    return this._getNode(node.x, node.y);
  }
}
