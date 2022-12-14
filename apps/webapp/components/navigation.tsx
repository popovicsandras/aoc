import { css } from '@emotion/react';
import Link from 'next/link'

export function Navigation() {
  return (
    <nav role="navigation" css={css({ flex: '0 0 auto', borderRight: '1px solid #009900', paddingRight: 16, minHeight: '100%' })}>
      <ul>
        {[...Array(26)].map((_value, index) => {
          const isActive = true;
          return (
            <li key={`day-${index}`}>
              <Link
                href={isActive ? `/day/${index}` : '#'}
                css={css({
                  ...(!isActive ? {
                    pointerEvents: 'none',
                    color: '#DBCCCC !important'
                  } : {})
                })}>
                [Day {index}]
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
