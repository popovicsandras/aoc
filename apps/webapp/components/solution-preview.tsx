import { css } from '@emotion/react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';


export function SolutionPreview({code}: {code: string;}) {
  const __codeHtml: string = code ? Prism.highlight(code, Prism.languages.javascript, 'javascript') : '';

  return (
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
  );
}
