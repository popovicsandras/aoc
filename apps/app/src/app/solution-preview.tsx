import { css } from '@emotion/react';
// import Prism, { languages } from 'prismjs';
const Prism = require('prismjs');
import 'prismjs/themes/prism-okaidia.css';


// import days from '@aoc/2022';
// console.log(days);

// The code snippet you want to highlight, as a string
const code = `import { resolve } from 'path';
import readLinesFromFile from '../utils/file-reader';

const main = async () => {
  const fileReader = readLinesFromFile(resolve(__dirname, 'input.txt'));

  let max = [0, 0, 0];
  let counter = 0;
  for await (let line of fileReader) {
    if (line.trim() === '') {
      for (let i = 0; i < max.length; i++){
        if (counter > max[i]) {
          max[i] = counter;
          break;
        }
      }
      counter = 0;
    } else {
      counter += parseInt(line, 10);
    }
  }
  console.log(max[0]);
  console.log(max[0] + max[1] + max[2]);
}

main();`;

// Returns a highlighted HTML string
const __html: string = Prism.highlight(code, Prism.languages.javascript, 'typescript');

export function SolutionPreview() {
  return (
    <>
      <main css={css({ flex: '1 1 auto', maxWidth: '50%' })}>
        <h1 css={css({marginBottom: 16})}>
          Solution
        </h1>
        <article>
          <pre>
            <code dangerouslySetInnerHTML={{__html}} />
          </pre>
        </article>
      </main>
      <aside css={css({ flex: '1 1 auto' })}>
      <h1 css={css({marginBottom: 16})}>
          Puzzle
        </h1>
        <article>
          Lorem ipsum...
        </article>
      </aside>
    </>
  );
}
