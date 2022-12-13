export class Node {
  private neighbours: Node[];
  constructor(public name: string, public x: number, public y: number) {
    this.neighbours = [];
  }

  addNeighbours(cells: Node[]) {
    this.neighbours = cells;
  }

  getNeightBours(): Node[] {
    return this.neighbours;
  }

  public get height(): number {
    const firstIndex = 97;
    if (this.name === 'S') {
      return 'a'.charCodeAt(0) - firstIndex;
    } else if (this.name === 'E') {
      return 'z'.charCodeAt(0) - firstIndex;
    } else {
      return this.name.charCodeAt(0) - firstIndex;
    }
  }

  toString() {
    return `${this.name} (${this.x}, ${this.y})`
  }
}
