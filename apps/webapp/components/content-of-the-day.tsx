import { useState } from 'react';
import { type CodeContainer, SolutionPreview } from './solution-preview';
import { PuzzlePreview } from './puzzle-preview';
import SubNavigation, { SELECTION } from './sub-navigation';
import { css } from '@emotion/react';

export default function ContentOfTheDay({ code, puzzle }: { code: CodeContainer; puzzle: string; }) {
  const [selection, setSelection] = useState(SELECTION.PUZZLE);

  let content;
  if (selection === SELECTION.CODE) {
    content = <SolutionPreview code={code} />;
  } else {
    content = <PuzzlePreview puzzle={puzzle} />;
  }

  return (
    <main css={css({
      flex: '1 0 auto',
    })}>
      <SubNavigation selection={selection} setSelection={setSelection} />
      {content}
    </main>
  );
}
