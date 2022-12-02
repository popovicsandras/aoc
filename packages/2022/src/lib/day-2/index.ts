import { resolve } from 'path';
import { createReadStream } from "fs";
import * as readline from 'readline';

// enum CHOICE_PLAYER_1 {
//   ROCK = 'A',
//   PAPER = 'B',
//   SCISSOR = 'C'
// }

// enum CHOICE_PLAYER_2 {
//   ROCK = 'X',
//   PAPER = 'Y',
//   SCISSOR = 'Z'
// }

// const shapeScore = {
//   X: 1,
//   Y: 2,
//   Z: 3
// }

// const outcomeScores = {
//   [`${CHOICE_PLAYER_1.ROCK} ${CHOICE_PLAYER_2.ROCK}`]: 3,
//   [`${CHOICE_PLAYER_1.ROCK} ${CHOICE_PLAYER_2.PAPER}`]: 6,
//   [`${CHOICE_PLAYER_1.ROCK} ${CHOICE_PLAYER_2.SCISSOR}`]: 0,
//   [`${CHOICE_PLAYER_1.PAPER} ${CHOICE_PLAYER_2.ROCK}`]: 0,
//   [`${CHOICE_PLAYER_1.PAPER} ${CHOICE_PLAYER_2.PAPER}`]: 3,
//   [`${CHOICE_PLAYER_1.PAPER} ${CHOICE_PLAYER_2.SCISSOR}`]: 6,
//   [`${CHOICE_PLAYER_1.SCISSOR} ${CHOICE_PLAYER_2.ROCK}`]: 6,
//   [`${CHOICE_PLAYER_1.SCISSOR} ${CHOICE_PLAYER_2.PAPER}`]: 0,
//   [`${CHOICE_PLAYER_1.SCISSOR} ${CHOICE_PLAYER_2.SCISSOR}`]: 3
// }

enum CHOICE {
  ROCK = 'A',
  PAPER = 'B',
  SCISSOR = 'C'
}

enum OUTCOME {
  LOOSE = 'X',
  DRAW = 'Y',
  WIN = 'Z'
}

const shapeScore = {
  [CHOICE.ROCK]: 1,
  [CHOICE.PAPER]: 2,
  [CHOICE.SCISSOR]: 3
}

const outcome = {
  X: 0,
  Y: 3,
  Z: 6
}

const playerScores = {
  [`${CHOICE.ROCK} ${OUTCOME.LOOSE}`]: shapeScore[CHOICE.SCISSOR],
  [`${CHOICE.ROCK} ${OUTCOME.DRAW}`]: shapeScore[CHOICE.ROCK],
  [`${CHOICE.ROCK} ${OUTCOME.WIN}`]: shapeScore[CHOICE.PAPER],
  [`${CHOICE.PAPER} ${OUTCOME.LOOSE}`]: shapeScore[CHOICE.ROCK],
  [`${CHOICE.PAPER} ${OUTCOME.DRAW}`]: shapeScore[CHOICE.PAPER],
  [`${CHOICE.PAPER} ${OUTCOME.WIN}`]: shapeScore[CHOICE.SCISSOR],
  [`${CHOICE.SCISSOR} ${OUTCOME.LOOSE}`]: shapeScore[CHOICE.PAPER],
  [`${CHOICE.SCISSOR} ${OUTCOME.DRAW}`]: shapeScore[CHOICE.SCISSOR],
  [`${CHOICE.SCISSOR} ${OUTCOME.WIN}`]: shapeScore[CHOICE.ROCK]
}

async function processLineByLine() {
  const fileStream = createReadStream(resolve(__dirname, 'input.txt'));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  // let sum = 0;
  // for await (const line of rl) {
  //   const player2Choice = line.replace(/[ABC ]/, '').trim() as keyof typeof shapeScore;
  //   console.log(player2Choice, shapeScore[player2Choice]);
  //   sum += outcomeScores[line] + shapeScore[player2Choice];
  // }

  // console.log(sum);

  let sum = 0;
  for await (const line of rl) {
    const outcomeKey = line.replace(/[ABC ]/, '').trim() as keyof typeof outcome;
    const outcomeScore = outcome[outcomeKey];
    sum += playerScores[line] + outcomeScore;
  }

  console.log(sum);
}

processLineByLine();
