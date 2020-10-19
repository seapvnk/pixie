import React, { useState } from 'react';
import Pixel from './components/Pixel';

function App() {

  const [ color, setColor ] = useState('#000000');
  const [ showGrid, setShowGrid ] = useState(false);
  const pixelQuantity = 16;
  const pixelSize = 40 / pixelQuantity;
  const [ pixels, setPixels ] = useState<string[]>(new Array(pixelQuantity ** 2).fill('#FFFFFF00'));

  function handlePainting(location: number) {
    setPixels(pixels.map((pixel, index) => index === location? color : pixel));
  }

  return (
    <div className="App">
      <div className="board">

        { pixels.map( (pixel, index) => (
          <Pixel
            key={index}
            index={index}
            paint={handlePainting} 
            size={pixelSize} 
            color={pixel}
            isGrid={showGrid}
          />
        )) }
      
      </div>
    </div>
  );
}

export default App;
