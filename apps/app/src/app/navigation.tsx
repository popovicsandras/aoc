import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

export function Navigation() {
  return <nav role="navigation" css={css({ flex: '0 0 auto' })}>
    <ul>
      {[...Array(25)].map((_value, index) => {
        const isActive = true;
        return (
          <li>
            <Link
              to={isActive ? `/day-${index + 1}` : '#'}
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
  </nav>;
}
