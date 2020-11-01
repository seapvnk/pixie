import React, { useState } from 'react';
import Board from './components/Board';
import Tool, { ToolType } from './components/Tool';
import Picture from './model/Picture';

import { RiEraserFill, RiPaintLine, RiPencilLine, RiStickyNote2Line } from "react-icons/ri";

function App() {

  const [color, setColor] = useState('#5e315b')
  const [picture, setPicture] = useState(Picture.empty(32, 32, '#ffffff00'))
  const [brush, setBrush] = useState(ToolType.Pencil)
  const pallete = [
    '#5e315b', '#8c3f5d',  '#ba6156',
    '#f2a65e',  '#ffe478',  '#cfff70',
    '#8fde5d',  '#3ca370',  '#3d6e70',
    '#323e4f',  '#322947',  '#473b78',
    '#4b5bab',  '#4da6ff',  '#66ffe3',
    '#ffffeb',  '#c2c2d1',  '#7e7e8f',
    '#606070',  '#43434f',  '#272736',
    '#3e2347',  '#57294b',  '#964253',
    '#e36956',  '#ffb570',  '#ff9166',
    '#eb564b',  '#b0305c',  '#73275c',
    '#422445',  '#5a265e',  '#80366b',
    '#bd4882',  '#ff6b97 ',
  ];

  function clearCanvas() {
    if (window.confirm('Delete your drawing?')) {
      setPicture(Picture.empty(32, 32, '#ffffff00'));
    }
  }

  function switchBrush(brush: ToolType) {
    return () => setBrush(brush);
  }

  function selectColor(selectedColor: string) {
    return () => setColor(selectedColor);
  }

  return (
    <div>
      <h1>Pixie</h1>

      <div className="app">
        <div className="tools">
          <Tool fn={switchBrush(ToolType.Pencil)}> <RiPencilLine /> </Tool>
          <Tool fn={switchBrush(ToolType.Fill)}> <RiPaintLine /> </Tool>
          <Tool fn={clearCanvas}> <RiStickyNote2Line /> </Tool>
          <Tool fn={selectColor('#ffffff00')}> <RiEraserFill /> </Tool>
        </div>

        <Board 
          picture={picture} 
          setPicture={setPicture} 
          color={color}
          backgroundType={1}
          brush={brush}
        />

        <div className="tools">
          {pallete.map(color => {
              return (
                <Tool 
                  fn={selectColor(color)}
                  style={{ background: color }}
                />
              )  
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
