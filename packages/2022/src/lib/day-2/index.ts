import { resolve } from 'path';
import readLinesFromFile from '../utils/file-reader';

enum CHOICE_PLAYER_1 {
  ROCK = 'A',
  PAPER = 'B',
  SCISSOR = 'C'
}

enum CHOICE_PLAYER_2 {
  ROCK = 'X',
  PAPER = 'Y',
  SCISSOR = 'Z'
}

const shapeScore = {
  X: 1,
  Y: 2,
  Z: 3
}

const outcomeScores = {
  [`${CHOICE_PLAYER_1.ROCK} ${CHOICE_PLAYER_2.ROCK}`]: 3,
  [`${CHOICE_PLAYER_1.ROCK} ${CHOICE_PLAYER_2.PAPER}`]: 6,
  [`${CHOICE_PLAYER_1.ROCK} ${CHOICE_PLAYER_2.SCISSOR}`]: 0,
  [`${CHOICE_PLAYER_1.PAPER} ${CHOICE_PLAYER_2.ROCK}`]: 0,
  [`${CHOICE_PLAYER_1.PAPER} ${CHOICE_PLAYER_2.PAPER}`]: 3,
  [`${CHOICE_PLAYER_1.PAPER} ${CHOICE_PLAYER_2.SCISSOR}`]: 6,
  [`${CHOICE_PLAYER_1.SCISSOR} ${CHOICE_PLAYER_2.ROCK}`]: 6,
  [`${CHOICE_PLAYER_1.SCISSOR} ${CHOICE_PLAYER_2.PAPER}`]: 0,
  [`${CHOICE_PLAYER_1.SCISSOR} ${CHOICE_PLAYER_2.SCISSOR}`]: 3
}

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

const choiceScore = {
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
  [`${CHOICE.ROCK} ${OUTCOME.LOOSE}`]: choiceScore[CHOICE.SCISSOR],
  [`${CHOICE.ROCK} ${OUTCOME.DRAW}`]: choiceScore[CHOICE.ROCK],
  [`${CHOICE.ROCK} ${OUTCOME.WIN}`]: choiceScore[CHOICE.PAPER],
  [`${CHOICE.PAPER} ${OUTCOME.LOOSE}`]: choiceScore[CHOICE.ROCK],
  [`${CHOICE.PAPER} ${OUTCOME.DRAW}`]: choiceScore[CHOICE.PAPER],
  [`${CHOICE.PAPER} ${OUTCOME.WIN}`]: choiceScore[CHOICE.SCISSOR],
  [`${CHOICE.SCISSOR} ${OUTCOME.LOOSE}`]: choiceScore[CHOICE.PAPER],
  [`${CHOICE.SCISSOR} ${OUTCOME.DRAW}`]: choiceScore[CHOICE.SCISSOR],
  [`${CHOICE.SCISSOR} ${OUTCOME.WIN}`]: choiceScore[CHOICE.ROCK]
}

const main = async () => {
  const fileReader = readLinesFromFile(resolve(__dirname, 'input.txt'));

  let sumA = 0;
  let sumB = 0;
  for await (let line of fileReader) {
    const player2Choice = line.replace(/[ABC ]/, '').trim() as keyof typeof shapeScore;
    sumA += outcomeScores[line] + shapeScore[player2Choice];

    const outcomeKey = line.replace(/[ABC ]/, '').trim() as keyof typeof outcome;
    const outcomeScore = outcome[outcomeKey];
    sumB += playerScores[line] + outcomeScore;
  }
  console.log(sumA);
  console.log(sumB);
}

main();
