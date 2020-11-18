import Picture from "../model/Picture";

interface MouseCoordinates {
    x: number;
    y: number;
}

export default function drawPicture(picture: Picture, context: CanvasRenderingContext2D, 
    mouse: MouseCoordinates, brushColor: string) {
    
    const scale = picture.scale;

    for (let y = 0; y < picture.height; y++) {
        for (let x = 0; x < picture.width; x++) {

            if (mouse.x > 0 || mouse.y > 0) {
                // draw cursor hover
                context.strokeStyle = brushColor;
                context.strokeRect(mouse.x * scale, mouse.y * scale, scale, scale);
            }

            // draw pixel
            context.fillStyle = picture.pixel(x, y);
            context.fillRect(x * scale, y * scale, scale, scale);
        }
    }
}