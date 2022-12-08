export async function findVisibleTrees(data: string): Promise<number> {
  let sum = 0;
  const rows = data.split('\n');
  const grid = rows.map(row => row.split('').map(numStr => parseInt(numStr, 10)));

  const isVisible = (i: number, j: number, grid: number[][]) => {
    if (i === 0 || i === grid.length - 1 || j === 0 || j === grid[i].length - 1) {
      return true;
    }

    const currentElement = grid[i][j];

    const maxFromLeft = grid[i]
      .slice(0, j)
      .reduce((max, item) => item > max ? item : max, 0);

    if (maxFromLeft < currentElement) {
      return true;
    }

    const maxFromRight = grid[i]
      .slice(j+1, Infinity)
      .reduce((max, item) => item > max ? item : max, 0);

    if (maxFromRight < currentElement) {
      return true;
    }

    const maxFromTop = [...Array(i).keys()]
      .map((index) => grid[index][j])
      .reduce((max, item) => item > max ? item : max, 0);

    if (maxFromTop < currentElement) {
      return true;
    }

    const maxFromBottom = [...Array(grid.length - i - 1).keys()]
      .map((index) => grid[index + i + 1][j])
      .reduce((max, item) => item > max ? item : max, 0);

    if (maxFromBottom < currentElement) {
      return true;
    }

    return false;
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (isVisible(i,j,grid)) {
        sum++;
      }
    }
  }

  return sum;
}
