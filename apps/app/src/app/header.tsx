import { css } from '@emotion/react';


export function Header() {
  return (<header css={css({ marginBottom: 16 })}>
    <h1>
      <a href="/" css={css({
        display: 'inline-block',
        textDecoration: 'none',
        marginTop: 3,
        color: '#00cc00 !important',
        textShadow: '0 0 2px #00cc00, 0 0 5px #00cc00',
      })}>
        Advent of Code solutions (unofficial)
      </a>
    </h1>
  </header>);
}
