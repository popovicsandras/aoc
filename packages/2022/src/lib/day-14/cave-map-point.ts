interface Coordinates { x: number; y: number; }

export enum CaveMapPointType {
  SandSource = '+',
  Rock = '#',
  Sand = 'o',
  Air = '.'
}

export class CaveMapPoint {
  constructor(public x: number, public y: number, public type: CaveMapPointType) {}

  clone(): CaveMapPoint {
    return new CaveMapPoint(this.x, this.y, this.type);
  }
}
