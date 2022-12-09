export interface Position { x: number; y: number; }

export function calculateTailPosition(head: Position, tail: Position): Position {
  let x = tail.x;
  let y = tail.y;

  if (Math.abs(head.x - tail.x) === 2) {
    x = tail.x + (head.x - tail.x) / 2;
    y = head.y;
  }

  if (Math.abs(head.y - tail.y) === 2) {
    x = head.x;
    y = tail.y + (head.y - tail.y) / 2;
  }

  return { x, y };
}
