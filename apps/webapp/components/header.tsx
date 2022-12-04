import { css } from '@emotion/react';
import Link from 'next/link'


export function Header() {
  return (<header css={css({ marginBottom: 16, height: 22 })}>
    <h1>
      <Link href="/" css={css({
        display: 'inline-block',
        textDecoration: 'none',
        marginTop: 3,
        color: '#00cc00 !important',
        textShadow: '0 0 2px #00cc00, 0 0 5px #00cc00',
      })}>
        Advent of Code solutions (unofficial)
      </Link>
    </h1>
  </header>);
}
