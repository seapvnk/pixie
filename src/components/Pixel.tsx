import React from 'react';

interface PixelProps {
    index: number;
    size: number;
    color: string;
    isGrid?: boolean
    paint: Function;
}

function Pixel({ size, color, paint, index, isGrid = false }: PixelProps) {
    return (
        <div
            onClick={() => paint(index)}
            className={`pixel ${isGrid && 'is-grid'}`}
            style={{ 
                background: color,
                width: `${size}vw`, 
                height: `${size}vw`,
            }} 
        >
        </div>
    )
}

export default Pixel;