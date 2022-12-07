export async function process(dataStream: AsyncGenerator<string, void, unknown>, part: number): Promise<number> {
  const TOTAL_DISK_SIZE = 70000000;
  const UPDATE_SIZE_REQUIREMENT = 30000000;
  const SMALL_DIR_CRITERIA = (size: number) => size <= 100000;

  const directorySizes = [] as number[];
  const tree: any = [];
  let treeCursor: any = [tree];

  const currentDirectory = () => {
    return treeCursor[treeCursor.length - 1];
  }

  const moveUpOneLevel = () => {
    const subdirectory = treeCursor.pop();
    const sumOfFileSizesInSubdirectory = subdirectory.reduce((acc: number, item: number) => acc + item, 0);
    directorySizes.push(sumOfFileSizesInSubdirectory);
    currentDirectory().pop();
    currentDirectory().push(sumOfFileSizesInSubdirectory)
  }

  const moveIntoDirectory = () => {
    const newDirectory: any = [];
    currentDirectory().push(newDirectory);
    treeCursor.push(newDirectory);
  }

  const persistFileSize = (line: string) => {
    let [sizeStr] = line.split(' ');
    const size = parseInt(sizeStr, 10);
    currentDirectory().push(size);
  }

  for await (let line of dataStream) {
    if (line.trim() === '' ) {
      continue;
    } else if (/^\$ cd \.\./.test(line)) {
      moveUpOneLevel();
    } else if (/^\$ cd /.test(line)) {
      moveIntoDirectory();
    } else if (/^[0-9]* /.test(line)) {
      persistFileSize(line);
    }
  }

  while (treeCursor.length > 1) {
    moveUpOneLevel();
  }

  if(part === 1) {
    return directorySizes.filter(SMALL_DIR_CRITERIA).reduce((acc: number, item: number) => acc + item, 0);
  } else {
    const freeSpace = TOTAL_DISK_SIZE - directorySizes[directorySizes.length - 1];
    const spaceNeeded = UPDATE_SIZE_REQUIREMENT - freeSpace;
    return directorySizes.reduce((bestFit: number, size: number) => size >= spaceNeeded && size < bestFit ? size : bestFit, Infinity);
  }
}
