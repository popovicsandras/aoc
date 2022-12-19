import { parse } from "./parse";
import { white, gray, yellowBright } from 'chalk';

export function display(dataStr: string) {
  let [top, right, bottom, left, parsedData] = parse(dataStr);

  const beacons = new Map<string, [number, number]>();
  parsedData.forEach(data => {
    const [Bx, By] = data[1];
    beacons.set(`${Bx}-${By}`, data[0]);
  });

  const sensors = new Map<string, [number, number]>();
  parsedData.forEach(data => {
    const [Sx, Sy] = data[0];
    sensors.set(`${Sx}-${Sy}`, data[1]);
  });

  process.stdout.write('     ');
  for (let x = left; x <= right; x++) {
    process.stdout.write(x < 0 ? '-' : '+');
  }
  process.stdout.write('\n');

  process.stdout.write('     ');
  for (let x = left; x <= right; x++) {
    process.stdout.write(Math.abs(x >= 0 ? Math.floor(x / 10) : Math.ceil(x / 10)).toString());
  }
  process.stdout.write('\n');

  process.stdout.write('     ');
  for (let x = left; x <= right; x++) {
    process.stdout.write(Math.abs(x % 10).toString());
  }
  process.stdout.write('\n');


  for (let y = top; y <= bottom; y++) {
    process.stdout.write(y.toString().padStart(3, ' ') + '  ');
    for (let x = left; x <= right; x++) {
      const [Px, Py] = [x, y];
      let sign = gray('.');
      for (let j = 0; j < parsedData.length; j++) {
        const data = parsedData[j];
        const [Sx, Sy] = data[0];
        const [Bx, By] = data[1];
        const sensorRange = Math.abs(Sx - Bx) + Math.abs(Sy - By);
        const distanceFromSensor = Math.abs(Sx - Px) + Math.abs(Sy - Py);

        if (distanceFromSensor <= sensorRange) {
          if (!beacons.has(`${Px}-${Py}`)) {
            if (sensors.has(`${Px}-${Py}`)) {
              sign = yellowBright('S');
            } else {
              sign = gray('#');
              break;
            }
          } else {
            sign = white('B');
          }
        }
      }
      process.stdout.write(sign);
    }
    process.stdout.write(' ' + y.toString().padStart(3, ' ') + '\n');
  }

  process.stdout.write('     ');
  for (let x = left; x <= right; x++) {
    process.stdout.write(x < 0 ? '-' : '+');
  }
  process.stdout.write('\n');

  process.stdout.write('     ');
  for (let x = left; x <= right; x++) {
    process.stdout.write(Math.abs(x >= 0 ? Math.floor(x / 10) : Math.ceil(x / 10)).toString());
  }
  process.stdout.write('\n');

  process.stdout.write('     ');
  for (let x = left; x <= right; x++) {
    process.stdout.write(Math.abs(x % 10).toString());
  }
  process.stdout.write('\n');
}
