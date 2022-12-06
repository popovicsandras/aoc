import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';

export function GlobalStyles() {
  return (<Global
    styles={css`
            ${emotionReset}

            @font-face {
              font-family: 'Source Code Pro';
              font-style: normal;
              font-weight: 300;
              src: url(https://fonts.gstatic.com/s/sourcecodepro/v22/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DJKQtMRrTFcZZJmOpwVS.woff2) format('woff2');
              unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
            }
            /* cyrillic */
            @font-face {
              font-family: 'Source Code Pro';
              font-style: normal;
              font-weight: 300;
              src: url(https://fonts.gstatic.com/s/sourcecodepro/v22/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DJKQtM1rTFcZZJmOpwVS.woff2) format('woff2');
              unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
            }
            /* greek-ext */
            @font-face {
              font-family: 'Source Code Pro';
              font-style: normal;
              font-weight: 300;
              src: url(https://fonts.gstatic.com/s/sourcecodepro/v22/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DJKQtMVrTFcZZJmOpwVS.woff2) format('woff2');
              unicode-range: U+1F00-1FFF;
            }
            /* greek */
            @font-face {
              font-family: 'Source Code Pro';
              font-style: normal;
              font-weight: 300;
              src: url(https://fonts.gstatic.com/s/sourcecodepro/v22/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DJKQtMprTFcZZJmOpwVS.woff2) format('woff2');
              unicode-range: U+0370-03FF;
            }
            /* vietnamese */
            @font-face {
              font-family: 'Source Code Pro';
              font-style: normal;
              font-weight: 300;
              src: url(https://fonts.gstatic.com/s/sourcecodepro/v22/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DJKQtMZrTFcZZJmOpwVS.woff2) format('woff2');
              unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
            }
            /* latin-ext */
            @font-face {
              font-family: 'Source Code Pro';
              font-style: normal;
              font-weight: 300;
              src: url(https://fonts.gstatic.com/s/sourcecodepro/v22/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DJKQtMdrTFcZZJmOpwVS.woff2) format('woff2');
              unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
            /* latin */
            @font-face {
              font-family: 'Source Code Pro';
              font-style: normal;
              font-weight: 300;
              src: url(https://fonts.gstatic.com/s/sourcecodepro/v22/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DJKQtMlrTFcZZJmOpw.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }

            html {
              height: 100%;
            }

            body {
              line-height: inherit;
              background: #0f0f23;
              margin: 8px;
              padding: 0;
              font-family: "Source Code Pro", monospace;
              font-size: 14pt;
              color: #DBCCCC;
              height: 100%;
            }

            #__next {
              height: 100%;
            }

            a, a:visited, a:active {
              color: #009900;
              text-decoration: none;
            }

            a:hover {
              color: #99ff99;
            }

            article h2 + * {
              margin-top: 0;
            }

            article h2 {
              color: #ffffff;
              margin-top: 1em;
              margin-bottom: 1em;
              white-space: nowrap;
            }

            article p {
              display: block;
              margin-block-start: 1em;
              margin-block-end: 1em;
              margin-inline-start: 0px;
              margin-inline-end: 0px;
            }

            article em.star {
              color: #ffff66;
              font-style: normal;
              text-shadow: 0 0 5px #ffff66;
            }

            article em {
              color: #ffffff;
              font-style: normal;
              text-shadow: 0 0 5px #ffffff;
            }

            article code {
              position: relative;
              display: inline-block;
              margin: 0;
              padding: 0;
            }

            article code:before {
              z-index: -1;
              content: "";
              position: absolute;
              display: block;
              left: -2px;
              right: -2px;
              top: 3px;
              bottom: 0px;
              border: 1px solid #333340;
              background: #10101a;
            }
          `} />);
}
