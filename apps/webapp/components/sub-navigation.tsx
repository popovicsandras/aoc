import { css } from '@emotion/react';

export enum SELECTION {
  PUZZLE = 'PUZZLE',
  MAIN = 'MAIN',
  CODE = 'CODE'
}

export default function SubNavigation({ selection, setSelection }) {
  const jump = (selection: SELECTION, event) => {
    setSelection(selection);
    event.preventDefault();
  };

  return (
    <ul css={css({
      display: 'flex',
      gap: 16,
      marginBottom: 16,

      '&': {
        'a.active': {
          color: '#99ff99'
        }
      }
    })}>
      <li>
        <a onClick={(event) => jump(SELECTION.PUZZLE, event)} href="#" className={selection === SELECTION.PUZZLE ? 'active' : ''}>[Puzzle]</a>
      </li>
      <li>
        <a onClick={(event) => jump(SELECTION.CODE, event)} href="#" className={selection === SELECTION.CODE ? 'active' : ''}>[Solution]</a>
      </li>
      <li>
        <a onClick={(event) => jump(SELECTION.MAIN, event)} href="#" className={selection === SELECTION.MAIN ? 'active' : ''}>[Main file]</a>
      </li>
    </ul>
  );
}
