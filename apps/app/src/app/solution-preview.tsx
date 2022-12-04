import { css } from '@emotion/react';

export function SolutionPreview() {
  return (
    <>
      <main css={css({ flex: '1 1 auto' })}>Solution</main>
      <aside css={css({ flex: '1 1 auto' })}>Riddle</aside>
    </>
  );
}
