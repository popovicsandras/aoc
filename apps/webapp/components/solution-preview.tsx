import { css } from '@emotion/react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';


export function SolutionPreview({code, puzzle}: {code: string; puzzle: string}) {
  const __codeHtml: string = Prism.highlight(code, Prism.languages.javascript, 'javascript');

  return (
    <>
      <aside css={css({ flex: '1 1 auto' })}>
      <h1 css={css({marginBottom: 16})}>
          Puzzle
        </h1>
        <article>
          <div dangerouslySetInnerHTML={{__html: puzzle}} />
        </article>
      </aside>
      <main css={css({ flex: '0 0 auto', width: '50%' })}>
        <h1 css={css({marginBottom: 16})}>
          Solution
        </h1>
        <article css={css({
          '&': {
            'code:before': {
              display: 'none'
            }
          }
        })}>
          <pre>
            <code dangerouslySetInnerHTML={{__html: __codeHtml}} />
          </pre>
        </article>
      </main>
    </>
  );
}
