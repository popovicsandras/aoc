import { css } from '@emotion/react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';


export function SolutionPreview({main, code, puzzle}: {main: string; code: string; puzzle: string}) {
  const __mainHtml: string = Prism.highlight(main, Prism.languages.javascript, 'javascript');
  const __codeHtml: string = code ? Prism.highlight(code, Prism.languages.javascript, 'javascript') : '';

  return (
    <>
      <aside css={css({ flex: '1 1 auto' })}>
      <h1 css={css({marginBottom: 16})}>
          Puzzle
        </h1>
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
          {code && <><pre>
            <code dangerouslySetInnerHTML={{__html: __codeHtml}} />
            </pre>
            <br />
            ------------------------------------------------------------------
            <br />
            <br />
            </>
          }
          <pre>
            <code dangerouslySetInnerHTML={{__html: __mainHtml}} />
          </pre>
        </article>
      </main>
    </>
  );
}
