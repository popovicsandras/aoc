import { css } from '@emotion/react';

export function PuzzlePreview({puzzle}: {puzzle: string}) {

  return (
    <article css={css({
      '&': {
        'li:before': {
          content: '"-"',
          position: 'absolute',
          left: 0,
          top: 0
        },

        'li': {
          paddingLeft: 42,
          position: 'relative'
        }
      }
    })}>
      <div dangerouslySetInnerHTML={{__html: puzzle}} />
    </article>
  );
}
