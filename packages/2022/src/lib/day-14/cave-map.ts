import { CaveMapPoint, CaveMapPointType } from "./cave-map-point";

export class CaveMap {
  private objects: Map<string, CaveMapPoint>;
  private sandPositionX: number | null = null;
  private sandPositionY: number | null = null;

  constructor(
    mapPoints: CaveMapPoint[],
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
    const map = new CaveMap([...this.objects.values()], this.left, this.top, this.bottom, this.right);
    if (this.sandPositionX && this.sandPositionY) {
      if (stableGrainOfSand) {
        map.set(this.sandPositionX, this.sandPositionY, CaveMapPointType.Sand);
      } else {
        map.addGrainOfSand(this.sandPositionX, this.sandPositionY);
      }
    }

    return map;
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

  isFalling() {
    let x = this.sandPositionX!;
    let y = this.sandPositionY!;

    let positionFound = false;
    let unstable = true;
    while (!positionFound && unstable) {
      if (!this.has(x,y+1)) {
        y++;
        positionFound = true;
      } else if (!this.has(x-1,y+1)) {
        y++;
        x--;
        positionFound = true;
      } else if (!this.has(x+1,y+1)) {
        y++;
        x++;
        positionFound = true;
      } else {
        unstable = false;
      }

      if (x < this.left || x > this.right || y > this.bottom) {
        throw new Error();
      }
    }

    this.sandPositionX = x;
    this.sandPositionY = y;

    return unstable;
  }

  display(x: number, y: number): CaveMapPointType {
    const dataPoint = this.objects.get(this.getKey(x, y));
    if (dataPoint) {
      return dataPoint.type;
    }

    if (x === this.sandPositionX && y === this.sandPositionY) {
      return CaveMapPointType.Sand;
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
