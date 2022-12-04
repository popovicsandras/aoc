import { css } from '@emotion/react';
import Link from 'next/link'

export function Navigation() {
  return (
    <nav role="navigation" css={css({ flex: '0 0 auto', borderRight: '1px solid #009900', paddingRight: 16, minHeight: '100%' })}>
      <ul>
        {[...Array(25)].map((_value, index) => {
          const isActive = true;
          return (
            <li key={`day-${index+1}`}>
              <Link
                href={isActive ? `day/${index + 1}` : '#'}
                css={css({
                  ...(!isActive ? {
                    pointerEvents: 'none',
                    color: '#DBCCCC !important'
                  } : {})
                })}>
                [Day {index + 1}]
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
