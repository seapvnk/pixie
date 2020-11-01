import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import Picture, { PaintingProps } from '../model/Picture';
import { ToolType } from './Tool';

interface BoardProps {
    picture: Picture;
    setPicture: Function;
    color: string;
    backgroundType: number;
    brush: ToolType
}

function Board({ picture, setPicture, color, backgroundType, brush }: BoardProps) {

    const canvasReference = useRef<HTMLCanvasElement>(null);
    const [paiting, setPainting] = useState(false)
    const [coordinates, setCoordinates] = useState({x: 0, y: 0})

    function handleBackgroundType(backgroundType: number) {
        if (backgroundType === 1) {
            return 'transparent-bg';
        }
        
        return ''
    }

    function floodFill(x: number, y: number, oldColor: string, color: string, picture: Picture, painted: Array<PaintingProps> = []) {
        
        if (color === oldColor) return ;
        if (x < 0 || x >= picture.width || y < 0 || y >= picture.height) return ;
        if (picture.pixel(x, y) !== oldColor) return ;

        painted.push({ x, y, color });
        picture = picture.setPixel(x, y, color);

        floodFill(x + 1, y, oldColor, color, picture, painted);
        floodFill(x - 1, y, oldColor, color, picture, painted);
        floodFill(x, y + 1, oldColor, color, picture, painted);
        floodFill(x, y - 1, oldColor, color, picture, painted);

    }

    function handleFillBrush(x: number, y: number, color: string, picture: Picture): Array<PaintingProps> {
        const painted = new Array<PaintingProps>();
        const oldColor = picture.pixel(x, y);
        
        floodFill(x, y, oldColor, color, picture, painted);

        return painted;
    }

    function handleClick() {
        const {x, y} = coordinates;

        if (brush === ToolType.Pencil) {
            setPicture(picture.setPixel(x, y, color));
            setPainting(true);
        }

        if (brush === ToolType.Fill) {
            const painted = handleFillBrush(x, y, color, picture);
            setPicture(picture.draw(picture, painted));
        }
        
    }

    function handleMove(event: MouseEvent) {
        const rect = canvasReference.current?.getBoundingClientRect();
        if (rect) {
            setCoordinates({
                x: Math.floor((event.clientX - rect.left) / picture.scale),
                y: Math.floor((event.clientY - rect.top) / picture.scale),
            })
        }

        if (paiting && brush === ToolType.Pencil ) {
            const {x, y} = coordinates;
            const painted = [{x, y, color}] as Array<PaintingProps>;
            setPicture(picture.draw(picture, painted));
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