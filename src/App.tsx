import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import Tool, { ToolType } from './components/Tool';
import Picture from './model/Picture';

import { RiEraserFill, RiPaintLine, RiPencilLine, 
         RiStickyNote2Line, RiDropFill, RiSave2Fill } from "react-icons/ri";
         
import ColorPicker from './components/ColorPicker';
import loadPalette from './utils/loadPalette';
import toPalette from './utils/toPalette';


function App() {

  const [picture, setPicture] = useState(Picture.empty(32, 32, '#ffffff00'));
  const [brush, setBrush] = useState(ToolType.Pencil);
  const [triggerSaveButton, setTriggerSaveButton] = useState(false);
  const [scale, setScale] = useState(16);

  const [palette, setColorPalette] = useState(toPalette(`
    #1a1c2c#5d275d#b13e53
    #ef7d57#ffcd75#a7f070
    #38b764#257179#29366f
    #3b5dc9#41a6f6#73eff7
    #f4f4f4#94b0c2#566c86
    #333c57
  `));
    
  const [color, setColor] = useState(palette[0]);
  
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
  }, [scale, picture.width, picture.height, picture.pixels]);

  function handleKeyShortcuts(event: KeyboardEvent) {
    event.preventDefault();

    if (!event.altKey && !event.ctrlKey) {
      switch (event.key) {
          case 'b': setBrush(ToolType.Fill); break;
          case 'e': setColor('#ffffff00'); break;
          case 'p': setBrush(ToolType.Pencil); break;
          case 'd': setBrush(ToolType.Drop); break;

          // scales
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
          <Tool fn={loadPalette(setColorPalette)}> L </Tool>
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

          <Tool fn={selectColor('#ffffff00')}><RiEraserFill /></Tool>
          
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
