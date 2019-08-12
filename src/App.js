import React from 'react';

import Header from './components/Header/Header';
import Main from './components/Main/Main';

const App = () => {
  return (
    <React.StrictMode>
      <div className="App">
        <Header />
        <Main />
      </div>
    </React.StrictMode>
  );
};

export default App;
