import { CaveMap } from './cave-map';

type coord = [number, number];

interface TestCase {
  focused?: boolean;
  name: string;
  input: string;
  coords: [coord, coord, coord];
  width: number;
  height: number;
  size: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
}

describe('Map parser', () => {
  const cases: TestCase[] = [
    {
      name: 'left to right',
      input: '465,6 -> 467,6',
      coords: [ [465,6], [466,6], [467,6] ],
      width: 3,
      height: 1,
      size: 3,
      left: 465,
      right: 467,
      top: 6,
      bottom: 6
    },
    {
      name: 'left to right (negative)',
      input: '-465,-6 -> -467,-6',
      coords: [ [-465,-6], [-466,-6], [-467,-6] ],
      width: 3,
      height: 1,
      size: 3,
      left: -467,
      right: -465,
      top: -6,
      bottom: -6
    },
    {
      name: 'right to left',
      input: '467,6 -> 465,6',
      coords: [ [467,6], [466,6], [465,6] ],
      width: 3,
      height: 1,
      size: 3,
      left: 465,
      right: 467,
      top: 6,
      bottom: 6
    },
    {
      name: 'right to left (negative)',
      input: '-467,-6 -> -465,-6',
      coords: [ [-467,-6], [-466,-6], [-465,-6] ],
      width: 3,
      height: 1,
      size: 3,
      left: -467,
      right: -465,
      top: -6,
      bottom: -6
    },
    {
      name: 'top to bottom',
      input: '465,6 -> 465,8',
      coords: [ [465,6], [465,7], [465,8] ],
      width: 1,
      height: 3,
      size: 3,
      left: 465,
      right: 465,
      top: 6,
      bottom: 8
    },
    {
      name: 'top to bottom (negative)',
      input: '-465,-6 -> -465,-8',
      coords: [ [-465,-6], [-465,-7], [-465,-8] ],
      width: 1,
      height: 3,
      size: 3,
      left: -465,
      right: -465,
      top: -8,
      bottom: -6
    },
    {
      name: 'bottom to top',
      input: '465,8 -> 465,6',
      coords: [ [465,8], [465,7], [465,6] ],
      width: 1,
      height: 3,
      size: 3,
      left: 465,
      right: 465,
      top: 6,
      bottom: 8
    },
    {
      name: 'bottom to top (negative)',
      input: '-465,-8 -> -465,-6',
      coords: [ [-465,-8], [-465,-7], [-465,-6] ],
      width: 1,
      height: 3,
      size: 3,
      left: -465,
      right: -465,
      top: -8,
      bottom: -6
    }
  ];

  cases.forEach(({focused, name, input, coords, width, height, size, left, right, top, bottom}) => {
    (focused ? it.only : it)(`should test case when parsing data of ${name}`, () => {

    const caveMap = CaveMap.parseFrom(input);
    coords.forEach(coords => expect(caveMap.has(...coords)).toBeTruthy())
    expect(caveMap.size).toEqual(size);
    expect(caveMap.width).toEqual(width);
    expect(caveMap.height).toEqual(height);
    expect(caveMap.left).toEqual(left);
    expect(caveMap.right).toEqual(right);
    expect(caveMap.top).toEqual(top);
    expect(caveMap.bottom).toEqual(bottom);
    });
  });
});
