import React from 'react';
import { SearchProvider } from './components/SearchContext';
import Main from './components/Main/Main';

const App: React.FC = () => {
  return (
    <SearchProvider>
      <Main />
    </SearchProvider>
  );
};

export default App;
