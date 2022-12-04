import { css } from '@emotion/react';

import { Route, Routes } from 'react-router-dom';
import { Header } from './header';
import { GlobalStyles } from './global-styles';
import { Navigation } from './navigation';
import { SolutionPreview } from './solution-preview';
// import days from '@aoc/2022';

// console.log(days);

export function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <div css={css({display: 'flex', gap: '16px', width: '100%'})}>
        <Navigation />
        <Routes>
          <Route path="/" element={<SolutionPreview />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;


