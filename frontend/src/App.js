// src/App.js
import React from 'react';
import NoticeBoard from './components/NoticeBoard';
import AddNotice from './components/AddNotice';

function App() {
  return (
    <div className="App">
      <NoticeBoard />
      <AddNotice />
    </div>
  );
}

export default App;
