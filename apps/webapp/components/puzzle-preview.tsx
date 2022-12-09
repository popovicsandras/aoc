import { css } from '@emotion/react';

export function PuzzlePreview({puzzle}: {puzzle: string}) {

  return (
    <article css={css({
      '&': {
        paddingLeft: 16,
        'li:before': {
          content: '"-"',
          position: 'absolute',
          left: 0,
          top: 0
        },

        'li': {
          paddingLeft: 42,
          position: 'relative'
        },

        code: {
          padding: 12
        }
      }
    })}>
      <div dangerouslySetInnerHTML={{__html: puzzle}} />
    </article>
  );
}
