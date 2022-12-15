import { CaveMap } from "./cave-map";

interface Coordinates { x: number; y: number; }

export enum MapObjectType {
  SandSource = '+',
  Rock = '#',
  Sand = 'o',
  Air = '.'
}
export interface MapObject {
  type: MapObjectType;
  coordinates: Coordinates;
}
export class CaveMapParser {
  private left: number = Infinity;
  private right: number = -Infinity;
  private top: number = Infinity;
  private bottom: number = -Infinity;

  parse(input: string, x?: number, y?: number) {

    let mapPoints: MapObject[] = [];

    if (Number.isInteger(x) && Number.isInteger(y)) {
      [`${x},${y} -> ${x},${y}`].forEach(objectStr => {
        mapPoints = mapPoints.concat(this.parseLine(objectStr, MapObjectType.SandSource));
      });
    }

    input.split('\n').forEach(objectStr => {
      mapPoints = mapPoints.concat(this.parseLine(objectStr, MapObjectType.Rock));
    });

    return new CaveMap(mapPoints, this.left, this.top, this.bottom, this.right);
  }

  private parseLine(objectStr: string, type: MapObjectType) {
    const mapPointsForLine: MapObject[] = [];
    const boundaries = objectStr.split(' -> ');
    for (let i = 0; i < boundaries.length - 1; i++) {
      const [fromX, fromY] = boundaries[i].split(',').map(numStr => parseInt(numStr, 10));
      const [toX, toY] = boundaries[i + 1].split(',').map(numStr => parseInt(numStr, 10));

      if (fromX === toX) {
        const direction = fromY <= toY ? +1 : -1;
        for (let y = fromY; (fromY <= toY) ? y <= toY : y >= toY; y += direction) {
          this.top = Math.min(this.top, y);
          this.bottom = Math.max(this.bottom, y);
          this.left = Math.min(this.left, fromX);
          this.right = Math.max(this.right, fromX);
          mapPointsForLine.push({
            type,
            coordinates: {
              x: fromX,
              y
            }
          });
        }
      }

      if (fromY === toY) {
        const direction = fromX <= toX ? +1 : -1;
        for (let x = fromX; (direction === 1) ? x <= toX : x >= toX; x += direction) {
          this.top = Math.min(this.top, fromY);
          this.bottom = Math.max(this.bottom, fromY);
          this.left = Math.min(this.left, x);
          this.right = Math.max(this.right, x);
          mapPointsForLine.push({
            type,
            coordinates: {
              x,
              y: fromY
            }
          });
        }
      }
    }
    return mapPointsForLine;
  }
}
