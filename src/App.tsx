import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import Tool, { ToolType } from './components/Tool';
import Picture from './model/Picture';

import { RiEraserFill, RiPaintLine, RiPencilLine, 
         RiStickyNote2Line, RiDropFill, RiSave2Fill } from "react-icons/ri";
import ColorPicker from './components/ColorPicker';

function App() {

  const [color, setColor] = useState('#5e315b');
  const [picture, setPicture] = useState(Picture.empty(32, 32, '#ffffff00'));
  const [brush, setBrush] = useState(ToolType.Pencil);
  const [triggerSaveButton, setTriggerSaveButton] = useState(false);
  const [scale, setScale] = useState(16);

  const [palette, setColorPalette] = useState([
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
  ]);
  
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
  
  useEffect(() => {
    setPicture(new Picture(picture.width, picture.height, picture.pixels, scale));
  }, [scale]);

  function handleKeyShortcuts(event: KeyboardEvent) {
    event.preventDefault();

    if (!event.altKey && !event.ctrlKey) {
        switch (event.key) {
            case 'b': setBrush(ToolType.Fill); break;
            case 'e': setColor('#ffffff00'); break;
            case 'p': setBrush(ToolType.Pencil); break;
            case 'd': setBrush(ToolType.Drop); break;

            // scale
            case 'a': setScale(scale - 4); break;
            case 's': setScale(scale + 4); break;
        }
    }
  }

  window.addEventListener('keydown', event => handleKeyShortcuts(event));

  return (
    <div>
      <h1>Pixie</h1>

      <div className="app">
        <div className="tools">
          <Tool fn={() => setTriggerSaveButton(true)}><RiSave2Fill /></Tool>
          <Tool fn={switchBrush(ToolType.Drop)}> <RiDropFill /> </Tool>
          <Tool fn={switchBrush(ToolType.Pencil)}> <RiPencilLine /> </Tool>
          <Tool fn={switchBrush(ToolType.Fill)}> <RiPaintLine /> </Tool>
          <Tool fn={clearCanvas}> <RiStickyNote2Line /> </Tool>
        </div>

        <Board 
          picture={picture} 
          setPicture={setPicture} 
          color={color}
          brush={brush}
          setBrush={setBrush}
          setColor={setColor}
          switchTrigger={setTriggerSaveButton}
          save={triggerSaveButton}
        />

        <div className="tools">
          <Tool fn={selectColor('#ffffff00')}> <RiEraserFill /> </Tool>
          <ColorPicker 
            colorPalette={palette} 
            setColorPalette={setColorPalette} 
            brushColor={selectColor}
          />
          {palette.map((color, index) => {
            return (
                <Tool
                  key={index}
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
