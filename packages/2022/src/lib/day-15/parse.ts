
export function parse(dataStr: string): [number, number, number, number, [[number, number], [number, number]][]] {
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;
  let left = Infinity;

  const parsedData: [[number, number], [number, number]][] = [];
  dataStr.split('\n').forEach(dataRow => {
    const matches = [
      ...dataRow.matchAll(/Sensor at x=([-\d]*), y=([-\d]*): closest beacon is at x=([-\d]*), y=([-\d]*)/g)
    ] as unknown as [string, string, string, string, string];

    const Sx = parseInt(matches[0][1], 10);
    const Sy = parseInt(matches[0][2], 10);
    const Bx = parseInt(matches[0][3], 10);
    const By = parseInt(matches[0][4], 10);

    // This one needs correction!!!
    const sensorRange = Math.abs(Sx - Bx) + Math.abs(Sy - By);
    top = Math.min(top, Sy - sensorRange);
    right = Math.max(right, Sx + sensorRange);
    bottom = Math.max(bottom, Sy + sensorRange);
    left = Math.min(left, Sx - sensorRange);

    parsedData.push([[Sx, Sy], [Bx, By]]);
  });

  return [top, right, bottom, left, parsedData];
}
