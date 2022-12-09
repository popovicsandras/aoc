import { getPositions } from './test-helper';
import { calculateTailPosition } from './tail-position-calculator';

describe('Tail position calculator', () => {

  const cases = [
    [
      'tail remains in its current position',
      `3 | • • • •
       2 | • • • •
       1 | • H • •
       0 | T • • •
          --------
           0 1 2 3`,
      `3 | • • • •
       2 | • • • •
       1 | • H • •
       0 | T • • •
          --------
           0 1 2 3`
    ],
    [
      'tail remains in its current position even if they overlap',
      `3 | • • • •
       2 | • • • •
       1 | • • • •
       0 | B • • •
          --------
           0 1 2 3`,
      `3 | • • • •
       2 | • • • •
       1 | • • • •
       0 | B • • •
          --------
           0 1 2 3`
    ],
    [
      'tail catches up from left',
      `3 | • • • •
       2 | • • • •
       1 | • • • •
       0 | T • H •
          --------
           0 1 2 3`,
      `3 | • • • •
       2 | • • • •
       1 | • • • •
       0 | • T H •
          --------
           0 1 2 3`
    ],
    [
      'tail catches up from right',
      `3 | • • • •
       2 | • • • •
       1 | • • • •
       0 | • H • T
          --------
           0 1 2 3`,
      `3 | • • • •
       2 | • • • •
       1 | • • • •
       0 | • H T •
          --------
           0 1 2 3`
    ],
    [
      'tail catches up from bottom',
      `3 | • • • •
       2 | H • • •
       1 | • • • •
       0 | T • • •
          --------
           0 1 2 3`,
      `3 | • • • •
       2 | H • • •
       1 | T • • •
       0 | • • • •
          --------
           0 1 2 3`
    ],
    [
      'tail catches up from top',
      `3 | • • • •
       2 | T • • •
       1 | • • • •
       0 | H • • •
          --------
           0 1 2 3`,
      `3 | • • • •
       2 | • • • •
       1 | T • • •
       0 | H • • •
          --------
           0 1 2 3`
    ],
    [
      'tail catches up from bottom left',
      `3 | • • • •
       2 | • • • •
       1 | • • H •
       0 | T • • •
          --------
           0 1 2 3`,
      `3 | • • • •
       2 | • • • •
       1 | • T H •
       0 | • • • •
          --------
           0 1 2 3`
    ],
    [
      'tail catches up from left bottom',
      `3 | • • • •
       2 | • • H •
       1 | • • • •
       0 | • T • •
          --------
           0 1 2 3`,
      `3 | • • • •
       2 | • • H •
       1 | • • T •
       0 | • • • •
          --------
           0 1 2 3`
    ],
    [
      'tail catches up from bottom right',
      `3 | • • • •
       2 | • • • •
       1 | • H • •
       0 | • • • T
          --------
           0 1 2 3`,
      `3 | • • • •
       2 | • • • •
       1 | • H T •
       0 | • • • •
          --------
           0 1 2 3`
    ],
    [
      'tail catches up from right bottom',
      `3 | • • • •
       2 | • H • •
       1 | • • • •
       0 | • • T •
          --------
           0 1 2 3`,
      `3 | • • • •
       2 | • H • •
       1 | • T • •
       0 | • • • •
          --------
           0 1 2 3`
    ],
  ];

  cases.forEach(([testCase, init, expected]) => {
    it(`should test case when ${testCase}`, () => {

    const [head, tail] = getPositions(init);
    const [_expectedHead, expectedTail] = getPositions(expected);
    console.log(head, tail)

    const newPosition = calculateTailPosition(head, tail);
    expect(newPosition).toEqual(expectedTail);
    });
  });
});
