export async function process(dataStream: AsyncGenerator<string, void, unknown>) {
  let cycle = 0;
  let register = 1;
  let sum = 0;
  const checkPoints = [20, 60, 100, 140, 180, 220];

  for await (let line of dataStream) {
    const [command, argument] = line.split(' ');
    let cycleIncrease = 1;

    if (command === 'addx') {
      cycleIncrease = 2;
    }

    for (let i = 0; i < cycleIncrease; i++) {
      cycle++;
      if (checkPoints.includes(cycle)) {
        sum += cycle * register;
      }
    }

    register += parseInt(argument ?? 0, 10) ;
  }

  return sum;
}
