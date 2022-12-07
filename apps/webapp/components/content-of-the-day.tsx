import { useState } from 'react';
import { SolutionPreview } from './solution-preview';
import { PuzzlePreview } from './puzzle-preview';
import SubNavigation, { SELECTION } from './sub-navigation';

export default function ContentOfTheDay({ main, code, puzzle }: { main: string; code: string; puzzle: string; }) {
  const [selection, setSelection] = useState(SELECTION.PUZZLE);

  let content;
  if (selection === SELECTION.CODE) {
    content = <SolutionPreview code={code} />;
  } else if (selection === SELECTION.MAIN) {
    content = <SolutionPreview code={main} />;
  } else {
    content = <PuzzlePreview puzzle={puzzle} />;
  }

  return (
    <main>
      <SubNavigation selection={selection} setSelection={setSelection} />
      {content}
    </main>
  );
}
