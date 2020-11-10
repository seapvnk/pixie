import React, { useState } from 'react';
import Tool from './Tool';

interface ColorPickerProps {
    colorPalette: Array<string>
    setColorPalette: Function;
    brushColor: Function;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ setColorPalette, colorPalette, brushColor }) => {
    const [selectedColor, setSelectedColor] = useState("no-color-selected");
    
    const appendColor = () => {
        if (selectedColor !== 'no-color-selected') {
            const newColorPalette = [selectedColor, ...colorPalette];
            setColorPalette(newColorPalette);
        }
    }
    
    return (
        <React.Fragment>
            <label htmlFor="color-picker">
                <Tool style={{backgroundColor: selectedColor}} fn={() => {
                    appendColor();
                }}>+</Tool>
            </label>
            <input 
                className="input-tool"
                type="color"
                id="color-picker" 
                value={selectedColor}
                onChange={e => {
                    const setBrushColor = brushColor(e.target.value);
                    setSelectedColor(e.target.value);
                    setBrushColor();
                }}
                />
        </React.Fragment>
    )
}

export default ColorPicker;