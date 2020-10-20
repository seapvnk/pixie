import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import Picture from '../model/Picture';

interface BoardProps {
    picture: Picture;
    setPicture: Function;
}

function Board({ picture, setPicture }: BoardProps) {

    const canvasReference = useRef<HTMLCanvasElement>(null);

    function handleMouseDown(event: any) {
        console.log(event);
    }

    function draw(picture: Picture, context: CanvasRenderingContext2D) {
        const scale = 10;
        

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

    return <canvas ref={canvasReference} onMouseDown={handleMouseDown} className="board"></canvas>
}

export default Board;