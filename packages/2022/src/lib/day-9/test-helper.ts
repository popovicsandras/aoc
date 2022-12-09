import { type Position } from './tail-position-calculator';

export const getPositions = (boardRepresentation: string): [Position, Position] => {
  const BOARD_SIZE = 4;
  const oneLiner = boardRepresentation.split('\n').reverse().join('').replace(/[^•HTB]/g, '').trim();
  const indexOfBoth = oneLiner.indexOf('B');
  const indexOfHead = oneLiner.indexOf('H');
  const indexOfTail = oneLiner.indexOf('T');

  let positionOfHead: Position, positionOfTail: Position;
  if (indexOfBoth !== -1) {
    positionOfHead = positionOfTail = {
      x: indexOfBoth % BOARD_SIZE,
      y: Math.floor(indexOfBoth / BOARD_SIZE)
    };
  } else {
    positionOfHead = {
      x: indexOfHead % BOARD_SIZE,
      y: Math.floor(indexOfHead / BOARD_SIZE)
    };

    positionOfTail = {
      x: indexOfTail % BOARD_SIZE,
      y: Math.floor(indexOfTail / BOARD_SIZE)
    };
  }

  return [positionOfHead, positionOfTail];
};
