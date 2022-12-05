import { css } from '@emotion/react';
import Link from 'next/link'


export function Header() {
  return (<header css={css({ marginBottom: 16, height: 22 })}>
    <h1>
      <Link href="https://adventofcode.com" css={css({
        display: 'inline-block',
        textDecoration: 'none',
        marginTop: 3,
        color: '#00cc00 !important',
        textShadow: '0 0 2px #00cc00, 0 0 5px #00cc00',
        '&:hover': {
          color: '#99ff99 !important',

          'span': {
            color: '#009900'
          }
        }
      })}>
        Advent of Code <span>solutions (unofficial)</span>
      </Link>
    </h1>
  </header>);
}
