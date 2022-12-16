import { CaveMapPoint, CaveMapPointType } from "./cave-map-point";

export class CaveMap {
  private objects: Map<string, CaveMapPoint>;
  private sandPositionX: number | null = null;
  private sandPositionY: number | null = null;

  constructor(
    mapPoints: CaveMapPoint[],
    private sourceOfSandX: number,
    private sourceOfSandY: number,
    private _left: number = -Infinity,
    private _top: number = -Infinity,
    private _bottom: number = Infinity,
    private _right: number = Infinity
  ) {
    this.objects = new Map<string, CaveMapPoint>();
    mapPoints.forEach(point => {
      this.set(
        point.x,
        point.y,
        point.type
      );
    })
  }

  clone(stableGrainOfSand = false): CaveMap {
    const map = new CaveMap(
      [...this.objects.values()],
      this.sourceOfSandX,
      this.sourceOfSandY,
      this.left,
      this.top,
      this.bottom,
      this.right
    );

    if (this.sandPositionX && this.sandPositionY) {
      if (stableGrainOfSand) {
        map.set(this.sandPositionX, this.sandPositionY, CaveMapPointType.Sand);
      } else {
        map.addGrainOfSand(this.sandPositionX, this.sandPositionY);
      }
    }

    return map;
  }

  addGroundFloor() {
    for(let x = this.sourceOfSandX - this.height - 2; x <= this.sourceOfSandX + this.height + 2; x++) {
      this.set(x, this._bottom + 2, CaveMapPointType.Rock);
    }

    this._left = this.sourceOfSandX - this.height - 3;
    this._right = this.sourceOfSandX + this.height + 3;
    this._bottom = this._bottom + 2;
  }

  addGrainOfSand(x: number, y: number) {
    this.sandPositionX = x;
    this.sandPositionY = y;
  }

  get(x: number, y: number): CaveMapPoint | undefined {
    return this.objects.get(this.getKey(x, y));
  }

  set(x: number, y: number, type: CaveMapPointType): void {
    this.objects.set(this.getKey(x, y), new CaveMapPoint(x, y, type));
  }

  has(x: number, y: number): boolean {
    return this.objects.has(this.getKey(x, y));
  }

  calculateGrainOfSandDestination(): {reachedSource: boolean; outIntOAbyss: boolean} {
    let x = this.sandPositionX!;
    let y = this.sandPositionY!;

    let stable = false;
    let outIntOAbyss = false;
    let reachedSource = false;

    while (!stable && !outIntOAbyss && !reachedSource) {
      if (!this.has(x, y+1)) {
        y++;
      } else if (!this.has(x-1, y+1)) {
        y++; x--;
      } else if (!this.has(x+1, y+1)) {
        y++; x++;
      } else {
        stable = true;
      }

      if (x === this.sourceOfSandX && y === this.sourceOfSandY) {
        reachedSource = true;
      }

      if (x < this.left || x > this.right || y > this.bottom) {
        outIntOAbyss = true;
      }
    }

    this.sandPositionX = x;
    this.sandPositionY = y;

    return {reachedSource, outIntOAbyss};
  }

  display(x: number, y: number): CaveMapPointType {
    const dataPoint = this.objects.get(this.getKey(x, y));
    if (dataPoint) {
      return dataPoint.type;
    }

    if (x === this.sandPositionX && y === this.sandPositionY) {
      return CaveMapPointType.Sand;
    }

    if (x === this.sourceOfSandX && y === this.sourceOfSandY) {
      return CaveMapPointType.SandSource;
    }

    return CaveMapPointType.Air;
  }

  get size(): number {
    return this.objects.size;
  }

  get width(): number {
    return Math.abs(this._right - this._left) + 1;
  }

  get height(): number {
    return Math.abs(this._bottom - this._top) + 1;
  }

  get left(): number {
    return this._left;
  }

  get right(): number {
    return this._right;
  }

  get top(): number {
    return this._top;
  }

  get bottom(): number {
    return this._bottom;
  }

  get forEach() {
    return this.objects.forEach;
  }

  private getKey(x: number, y: number): string {
    return `${x}-${y}`;
  }
}
