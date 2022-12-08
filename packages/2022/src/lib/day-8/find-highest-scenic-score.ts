export async function findHighestScenicScore(data: string): Promise<number> {
  let max = 0;
  const rows = data.split('\n');
  const grid = rows.map(row => row.split('').map(numStr => parseInt(numStr, 10)));

  enum AXIS { HORIZONTAL = 1, VERTICAL = 2 };
  enum ORDER { ASC = 1, DESC = -1 };

  const calculateScenicScore = (i: number, j: number, grid: number[][]): number => {
    const currentElement = grid[i][j];

    const calculateDirection = (from: number, until: number, axis: AXIS, direction: ORDER): number => {
      let score = 0;
      for (let k = from; direction < 0 ? k >= until : k < until; k = k + direction) {
        score++;
        if (axis === AXIS.HORIZONTAL && grid[i][k] >= currentElement ||
            axis === AXIS.VERTICAL && grid[k][j] >= currentElement ) {
          break;
        }
      }
      return score;
    }

    const fromLeft = calculateDirection(j-1, 0, AXIS.HORIZONTAL, ORDER.DESC);
    const fromRight = calculateDirection(j+1, grid[i].length, AXIS.HORIZONTAL, ORDER.ASC);
    const fromTop = calculateDirection(i-1, 0, AXIS.VERTICAL, ORDER.DESC);
    const fromBottom = calculateDirection(i+1, grid.length, AXIS.VERTICAL, ORDER.ASC);

    return fromLeft * fromRight * fromTop * fromBottom;
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const currentScore = calculateScenicScore(i,j,grid);
      if (currentScore >= max) {
        max = currentScore;
      }
    }
  }

  return max;
}
