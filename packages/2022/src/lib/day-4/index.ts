import { resolve } from 'path';
import readLinesFromFile from '../utils/file-reader';

const main = async () => {
  const fileReader = readLinesFromFile(resolve(__dirname, 'input.txt'));

  let totalSubsets = 0;
  let totalOverlaps = 0;
  for await (let line of fileReader) {
    const pairs = line.split(',');
    let range1 = pairs[0].split('-');
    let range2 = pairs[1].split('-');
    let min1 = parseInt(range1[0], 10);
    let max1 = parseInt(range1[1], 10);
    let min2 = parseInt(range2[0], 10);
    let max2 = parseInt(range2[1], 10);

    if ( (min1 <= min2 && max1 >= max2) || (min2 <= min1 && max2 >= max1) ) {
      totalSubsets += 1;
    }

    if ( (min2 <= max1 && max1 <= max2) || (min1 <= max2 && max2 <= max1) ) {
      totalOverlaps += 1;
    }
  }

  console.log(totalSubsets);
  console.log(totalOverlaps);
}

main();
