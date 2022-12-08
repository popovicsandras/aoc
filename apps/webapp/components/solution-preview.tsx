import { css } from '@emotion/react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import { useState } from 'react';

export interface CodeContainer {
  [key: string]: string;
}

const mainFile = 'index.ts';

export function SolutionPreview({code}: {code: CodeContainer;}) {
  const [selectedFile, selectFile] = useState(mainFile);
  const content = Prism.highlight(code[selectedFile], Prism.languages.javascript, 'javascript')
  const sourceFiles = Object.keys(code).filter(fileName => fileName !== mainFile);

  const showCode = (event, fileName: string) => {
    selectFile(fileName);
    event.preventDefault();
  }

  return (
    <>
      <ul css={css({
        display: 'flex',
        gap: 16,
        marginBottom: 24,
        marginTop: 24,
        borderBottom: '1px solid #009900',
        paddingLeft: 16,

        '&': {
          a: {
            // backgroundColor: '#ffff66',
            // color: '#10101a',
            border: '1px solid #009900',
            borderBottom: '1px solid transparent',
            padding: '6px 10px 6px 10px',
            position: 'relative',
            top: 1,

            '&.active': {
              borderBottom: '1px solid #0f0f23',
              color: '#99ff99'
            }
          }
        }
      })}>
          <li key='index.ts' css={css({
            display: 'flex'
          })}>
            <a href="#" className={selectedFile === mainFile ? 'active' : ''} onClick={(event) => showCode(event, mainFile)}>{mainFile}</a>
          </li>
      { sourceFiles.map((fileName) => {
          return (
            <li key={fileName} css={css({
              display: 'flex'
            })}>
              <a href="#" className={selectedFile === fileName ? 'active' : ''} onClick={(event) => showCode(event, fileName)}>{fileName}</a>
            </li>
          );
        })}
      </ul>
      <article css={css({
        '&': {
          paddingLeft: 16,
          'code:before': {
            display: 'none'
          }
        }
        })}>
        <pre>
          <code dangerouslySetInnerHTML={{__html: content}} />
        </pre>
      </article>
    </>
  );
}
