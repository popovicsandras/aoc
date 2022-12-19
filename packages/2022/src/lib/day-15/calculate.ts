import { parse } from "./parse";

export function calculate(dataStr: string, y: number): number {
  const [top, right, bottom, left, parsedData] = parse(dataStr);
  // console.log('left: ', left);
  // console.log('right: ', right);

  const beacons = new Map<string, [number, number]>();
  parsedData.forEach(data => {
    const [Bx, By] = data[1];
    beacons.set(`${Bx}-${By}`, data[0]);
  });

  // console.log('Unique beacons count: ', beacons.size)

  let count = 0;

  for (let x = left; x <= right; x++) {
    const [Px, Py] = [x, y];
    for (let j = 0; j < parsedData.length; j++) {
      const data = parsedData[j];
      const [Sx, Sy] = data[0];
      const [Bx, By] = data[1];
      const sensorRange = Math.abs(Sx-Bx) + Math.abs(Sy-By);
      const distanceFromSensor = Math.abs(Sx-Px) + Math.abs(Sy-Py);

      if (distanceFromSensor <= sensorRange) {
        if (!beacons.has(`${Px}-${Py}`)) {
          count++;
          break;
        }
      }
    }
  }

  return count;
}


