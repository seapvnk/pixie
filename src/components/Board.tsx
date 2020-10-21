import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import Picture from '../model/Picture';

interface BoardProps {
    picture: Picture;
    setPicture: Function;
}

function Board({ picture, setPicture }: BoardProps) {

    const canvasReference = useRef<HTMLCanvasElement>(null);
    const [coordinates, setCoordinates] = useState({x: 0, y: 0})

    function handleMove(event: MouseEvent) {
        const rect = canvasReference.current?.getBoundingClientRect();
        if (rect) {
            setCoordinates({
                x: Math.floor((event.clientX - rect.left) / picture.scale),
                y: Math.floor((event.clientY - rect.top) / picture.scale),
            })
        }
    }

    function handleClick() {
        

        setPicture(picture.setPixel(coordinates.x, coordinates.y, '#000'))
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
    }, [draw])

    return (
        <canvas
            style={{
                width: `${picture.scale * picture.width}px`,
                height: `${picture.scale * picture.height}px`,
            }}
            ref={canvasReference}
            onMouseMove={handleMove}
            onMouseDown={handleClick}
            className="board">
        </canvas>
    )
}

export default Board;