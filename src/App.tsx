import React from 'react';
import { SearchProvider } from './components/SearchContext';
import Main from './components/Main/Main';
import { Provider } from 'react-redux';
import { store } from './redux/app/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SearchProvider>
        <Main />
      </SearchProvider>
    </Provider>
  );
};

export default App;
