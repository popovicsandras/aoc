import assert = require('assert');
const street: Block[] = require('./street.json');

interface Block {
  gym: boolean;
  school: boolean;
  store: boolean;
}

interface BlockResult {
  gym: number;
  school: number;
  store: number;
}

const main = () => {
  const priorities: (keyof Block)[] = ['gym', 'school', 'store']
  const results = street.map(() => {
    return priorities.reduce((acc, item) => ({...acc, [item]: Infinity}), {} as BlockResult)
  });

  console.log(results);


  for (let index = 0; index < street.length; index++) {
    const block = street[index];
    priorities.forEach(priority => {
      let distance = Infinity;

      if (block[priority]) {
        distance = 0;
      } else if (results[index-1]?.[priority] !== Infinity) {
        distance = results[index-1]?.[priority] + 1;
      }

      if (distance <  results[index][priority]) {
        results[index][priority] = distance;
      }
    });
  }

  for (let index = street.length-1; index >= 0 ; index--) {
    const block = street[index];
    priorities.forEach(priority => {
      let distance = Infinity

      if (block[priority]) {
        distance = 0;
      } else if (results[index+1]?.[priority] !== Infinity) {
        distance = results[index+1]?.[priority] + 1;
      }

      if (distance <  results[index][priority]) {
        results[index][priority] = distance;
      }
    });
  }

  const distances = results.map(result => Math.max(...Object.values(result)))
  const answer = distances.indexOf(Math.min(...distances));
  console.log(answer);
}


main();

