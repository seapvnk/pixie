import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import Picture, { PaintingProps } from '../model/Picture';
import drawPicture from '../utils/drawPicture';
import floodFill from '../utils/floodFill';
import { ToolType } from './Tool';

interface BoardProps {
    picture: Picture;
    setPicture: Function;
    color: string;
    brush: ToolType;

    setColor: Function;
    setBrush: Function;

    switchTrigger: Function;
    save: boolean;
}

function Board({ picture, setPicture, color, brush, setColor, setBrush, switchTrigger, save }: BoardProps) {

    const canvasReference = useRef<HTMLCanvasElement>(null);
    const [paiting, setPainting] = useState(false)
    const [coordinates, setCoordinates] = useState({x: 0, y: 0})

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
        
        if (brush === ToolType.Drop) {
            const newColor = picture.pixel(x, y);
            
            setColor(newColor);
            setBrush(ToolType.Pencil);
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

    function handleMouseLeave() {
        setPainting(false);
        setCoordinates({ x: -1, y: -1});
    }

    useEffect(() => {
        if (canvasReference.current) {
            const canvas = canvasReference.current;
            const context = canvas.getContext('2d');
            if (context) {
                canvas.width = picture.width * picture.scale;
                canvas.height = picture.height * picture.scale;
                drawPicture(picture, context, coordinates, color);
            }
        }

        if (save) {
            if (canvasReference.current) {
                const fileName = `pixie-${Date.now()}`;
                
                const link = document.createElement('a');
                link.download = fileName + '.png';
                
                setCoordinates({ x: -1, y: -1 });

                canvasReference.current.toBlob( blob => {
                    link.href = URL.createObjectURL(blob);
                    link.click();
                });

                link.remove();
            }

            switchTrigger(false);
        }
    }, [picture, coordinates, save])

    return (
        <canvas

            style={{
                width: `${picture.scale * picture.width}px`,
                height: `${picture.scale * picture.height}px`,
            }}

            id="canvas-id"
            ref={canvasReference}
            onMouseMove={handleMove}
            onMouseDown={handleClick}
            onMouseUp={() => setPainting(false)}
            onMouseLeave={handleMouseLeave}
            className="board transparent-bg"
        >
        </canvas>
    )
}

export default Board;