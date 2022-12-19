import { parse } from "./parse";

export function calculate(dataStr: string, y: number): number {
  const [top, right, bottom, left, parsedData] = parse(dataStr);

  const beacons = new Map<string, [number, number]>();
  parsedData.forEach(data => {
    const [Bx, By] = data[1];
    beacons.set(`${Bx}-${By}`, data[0]);
  });

  let count = 0;

  for (let x = left; x <= right; x++) {
    const pointCoords = [x, y] as [number, number];

    for (let j = 0; j < parsedData.length; j++) {
      const data = parsedData[j];
      const sensorCoords = data[0];
      const beaconCoords = data[1];

      if (inRange(sensorCoords, beaconCoords, pointCoords)) {
        if (!beacons.has(`${pointCoords[0]}-${pointCoords[1]}`)) {
          count++;
          break;
        }
      }
    }
  }

  return count;
}

function inRange(sensorCoords: [number, number], beaconCoords: [number, number], pointCoords: [number, number]): boolean {
  const sensorRange = distance(sensorCoords, beaconCoords);
  const distanceFromSensor = distance(sensorCoords, pointCoords);

  return (distanceFromSensor <= sensorRange);

}

export function distance([Ax, Ay]: [number, number], [Bx, By]: [number, number]) {
  return Math.abs(Ax-Bx) + Math.abs(Ay-By)
}


