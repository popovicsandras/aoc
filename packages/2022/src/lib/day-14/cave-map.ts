import { CaveMapParser, MapObject, MapObjectType } from "./cave-map-parser";

export class CaveMap {
  private objects: Map<string, MapObject>;

  static parseFrom(input: string, x?: number, y?: number): CaveMap {
    const caveMapParser = new CaveMapParser();
    return caveMapParser.parse(input, x, y);
  }

  constructor(
    mapPoints: MapObject[],
    private _left: number = -Infinity,
    private _top: number = -Infinity,
    private _bottom: number = Infinity,
    private _right: number = Infinity
  ) {
    this.objects = new Map<string, MapObject>();
    mapPoints.forEach(point => {
      this.set(
        point.coordinates.x,
        point.coordinates.y,
        point
      );
    })
  }

  get(x: number, y: number): MapObject | undefined {
    return this.objects.get(this.getKey(x, y));
  }

  set(x: number, y: number, obj: MapObject): void {
    this.objects.set(this.getKey(x, y), obj);
  }

  has(x: number, y: number): boolean {
    return this.objects.has(this.getKey(x, y));
  }

  display(x: number, y: number): MapObjectType {
    const dataPoint = this.objects.get(this.getKey(x, y));
    if (dataPoint) {
      return dataPoint.type;
    }

    return MapObjectType.Air;
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
