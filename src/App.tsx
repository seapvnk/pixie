import React, { useState } from 'react';
import Board from './components/Board';
import Picture from './model/Picture';

function App() {

  const [picture, setPicture] = useState(Picture.empty(100, 100, '#ffffff00'))

  return (
    <div className="app">
      <div className="tools">
        <div className="tool" onClick={() => setPicture(Picture.empty(100, 100, '#ffffff00'))}>C</div>
      </div>

      <Board picture={picture} setPicture={setPicture}/>
    </div>
  );
}

export default App;
