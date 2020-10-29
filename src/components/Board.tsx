import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import Picture from '../model/Picture';

interface BoardProps {
    picture: Picture;
    setPicture: Function;
    color: string;
    backgroundType: number;
}

function Board({ picture, setPicture, color, backgroundType }: BoardProps) {

    const canvasReference = useRef<HTMLCanvasElement>(null);
    const [paiting, setPainting] = useState(false)
    const [coordinates, setCoordinates] = useState({x: 0, y: 0})

    function handleBackgroundType(backgroundType: number) {
        if (backgroundType === 1) {
            return 'transparent-bg';
        }
        
        return ''
    }

    function handleClick() {
        setPicture(picture.fillAt(coordinates.x, coordinates.y, color));
        setPainting(true)
    }

    function handleMove(event: MouseEvent) {
        const rect = canvasReference.current?.getBoundingClientRect();
        if (rect) {
            setCoordinates({
                x: Math.floor((event.clientX - rect.left) / picture.scale),
                y: Math.floor((event.clientY - rect.top) / picture.scale),
            })
        }

        if (paiting) {
            setPicture(picture.fillAt(coordinates.x, coordinates.y, color));
        }
    }

    function draw(picture: Picture, context: CanvasRenderingContext2D) {
        const scale = picture.scale;

        for (let y = 0; y < picture.height; y++) {
            for (let x = 0; x < picture.width; x++) {
                context.fillStyle = picture.pixel(x, y);
                context.fillRect(x * scale, y * scale, scale, scale);
            }
        }
    }

    useEffect(() => {
        if (canvasReference.current) {
            const canvas = canvasReference.current;
            const context = canvas.getContext('2d');
            if (context) {
                canvas.width = picture.width * picture.scale;
                canvas.height = picture.height * picture.scale;
                draw(picture, context);
            }
        }
    }, [picture])

    return (
        <canvas
            style={{
                width: `${picture.scale * picture.width}px`,
                height: `${picture.scale * picture.height}px`,
            }}
            ref={canvasReference}
            onMouseMove={handleMove}
            onMouseDown={handleClick}
            onMouseUp={() => setPainting(false)}
            className={`board ${handleBackgroundType(backgroundType)}`}>
        </canvas>
    )
}

export default Board;