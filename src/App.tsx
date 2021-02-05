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
         #050914#110524#3b063a#691749#9c3247#d46453#f5a15d#ffcf8e#ff7a7d
         #ff417d#d61a88#94007a#42004e#220029#100726#25082c#3d1132#73263d#bd4035#ed7b39
         #ffb84a#fff540#c6d831#77b02a#429058#2c645e#153c4a#052137#0e0421#0c0b42#032769
         #144491#488bd4#78d7ff#b0fff1#faffff#c7d4e1#928fb8#5b537d#392946#24142c#0e0f2c
         #132243#1a466b#10908e#28c074#3dff6e#f8ffb8#f0c297#cf968c#8f5765#52294b#0f022e
         #35003b#64004c#9b0e3e#d41e3c#ed4c40#ff9757#d4662f#9c341a#691b22#450c28#2d002e
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
