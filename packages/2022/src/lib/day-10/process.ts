type Pixel = '.' | '#' ;

class CRT {
  static blank = '.';
  static filled = '#';
  public pixels: Array<Pixel>;

  constructor(private width: number, private height: number) {
    this.pixels = Array(this.width * this.height).fill(CRT.blank);
  }

  setPixel(pixelIndex: number, char: Pixel) {
    this.pixels[pixelIndex] = char;
  }
}

export async function calculate(dataStream: AsyncGenerator<string, void, unknown>): Promise<[number, string]> {
  let cycle = 0;
  let register = 1;
  let sum = 0;
  const checkPoints = [20, 60, 100, 140, 180, 220];
  const crt = new CRT(40, 6);

  for await (let line of dataStream) {
    const [command, argument] = line.split(' ');
    let cycleIncrease = 1;

    if (command === 'addx') {
      cycleIncrease = 2;
    }

    for (let i = 0; i < cycleIncrease; i++) {
      if (Math.abs((cycle%40) - (register%40)) < 2) {
        crt.setPixel(cycle, '#');
      }

      cycle++;

      if (checkPoints.includes(cycle)) {
        sum += cycle * register;
      }
    }

    register += parseInt(argument ?? 0, 10) ;
  }

  return [sum, crt.pixels.join('')];
}

export async function display(dataStream: AsyncGenerator<string, void, unknown>): Promise<void> {
  let cycle = 0;
  let register = 1;
  const crt = new CRT(40, 6);

  for await (let line of dataStream) {
    const [command, argument] = line.split(' ');
    let cycleIncrease = 1;

    if (command === 'addx') {
      cycleIncrease = 2;
    }

    for (let i = 0; i < cycleIncrease; i++) {
      if (Math.abs((cycle%40) - (register%40)) < 2) {
        crt.setPixel(cycle, '#');
      }
      cycle++;
    }

    register += parseInt(argument ?? 0, 10) ;
  }

  setInterval(() => {
    const rand = Math.random();
    process.stdout.write('\r\r\r' + rand.toString().substring(0,3));
  }, 100)
}

