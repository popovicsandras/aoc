import { CaveMap } from "./cave-map";
import { CaveMapPoint, CaveMapPointType } from "./cave-map-point";

export class CaveMapParser {
  private left: number = Infinity;
  private right: number = -Infinity;
  private top: number = Infinity;
  private bottom: number = -Infinity;

  parse(input: string, x: number, y: number) {

    let mapPoints: CaveMapPoint[] = [];

    this.top = this.bottom = y;
    this.left = this.right =  x;

    input.split('\n').forEach(objectStr => {
      mapPoints = mapPoints.concat(this.parseLine(objectStr, CaveMapPointType.Rock));
    });

    return new CaveMap(mapPoints, x, y, this.left, this.top, this.bottom, this.right);
  }

  private parseLine(objectStr: string, type: CaveMapPointType) {
    const mapPointsForLine: CaveMapPoint[] = [];
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

          mapPointsForLine.push(new CaveMapPoint(fromX, y, type));
        }
      }

      if (fromY === toY) {
        const direction = fromX <= toX ? +1 : -1;
        for (let x = fromX; (direction === 1) ? x <= toX : x >= toX; x += direction) {
          this.top = Math.min(this.top, fromY);
          this.bottom = Math.max(this.bottom, fromY);
          this.left = Math.min(this.left, x);
          this.right = Math.max(this.right, x);
          mapPointsForLine.push(new CaveMapPoint(x, fromY, type));
        }
      }
    }
    return mapPointsForLine;
  }
}
