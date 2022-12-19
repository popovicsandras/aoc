import { distance } from './calculate';
import { parse } from './parse';

export function findDistressBeacon(dataStr: string): number {
  const [_top, _right, _bottom, _left, parsedData] = parse(dataStr);

  const sensors = getSensorsWithTheirRange(parsedData);

  let foundX = -Infinity;
  let foundY = -Infinity;

  for (let y = 0; y <= 4000000; y++) {
    const ranges = getRangesForLine(sensors, y);
    const mergedRanges = mergeOverlappingRanges(ranges);

    if (mergedRanges.length === 2 && Math.abs(mergedRanges[0][1] - mergedRanges[1][0]) === 2) {
      foundX = mergedRanges[0][1] + 1;
      foundY = y;
      break;
    }
  }

  return foundX * 4000000 + foundY;
}
function mergeOverlappingRanges(ranges: [number, number][]) {
  ranges.sort(([x1, _y1], [x2, _y2]) => {
    if (x1 > x2)
      return 1;
    else if (x1 === x2)
      return 0;
    else
      return -1;
  });

  const stack = [];
  if (ranges.length) {
    const item = ranges.shift()!;
    stack.push(item);

    while (ranges.length > 0) {
      const [_a, b] = stack[stack.length - 1];
      const [c, d] = ranges.shift()!;

      if (b >= c) {
        stack[stack.length - 1][1] = Math.max(b, d);
      } else {
        stack.push([c, d]);
      }
    }
  }
  return stack;
}

function getRangesForLine(sensors: [number, number, number][], y: number) {
  return sensors
    .filter(([Sx, Sy, range]) => {
      const verticalDistanceFromSensor = Math.abs(y - Sy);
      return verticalDistanceFromSensor <= range;
    })
    .map(([Sx, Sy, range]) => {
      const verticalDistanceFromSensor = Math.abs(y - Sy);
      const widthInRow = Math.abs(range - verticalDistanceFromSensor);
      return [Sx - widthInRow, Sx + widthInRow] as [number, number];
    });
}

function getSensorsWithTheirRange(parsedData: [[number, number], [number, number]][]) {
  const sensors = [] as [number, number, number][];
  parsedData.forEach((data) => {
    const sensorCoords = data[0];
    const beaconCoords = data[1];

    const sensorRange = distance(sensorCoords, beaconCoords);
    sensors.push([sensorCoords[0], sensorCoords[1], sensorRange]);
  });
  return sensors;
}

