export async function process(dataStream: AsyncGenerator<string, void, unknown>, maxCount = 1) {
  let maximums = [...Array(maxCount)].fill(0);
  let counter = 0;

  for await (let line of dataStream) {
    if (line.trim() === '') {
      for (let i = 0; i < maximums.length; i++) {
        if (counter > maximums[i]) {
          maximums[i] = counter;
          break;
        }
      }
      counter = 0;
    } else {
      counter += parseInt(line, 10);
    }
  }

  return maximums
    .slice(0, maxCount)
    .reduce((acc, element) => acc + element, 0);
}
