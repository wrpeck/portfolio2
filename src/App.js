import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './home';

function App() {
  return (
      <div>
        <Routes>
          <Route path="/" exact element={<Home />} />
        </Routes>
      </div>
  );
}

export default App;
