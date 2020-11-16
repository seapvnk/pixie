import Picture from "../model/Picture";

export default function drawPicture(picture: Picture, context: CanvasRenderingContext2D) {
    const scale = picture.scale;

    for (let y = 0; y < picture.height; y++) {
        for (let x = 0; x < picture.width; x++) {
            context.fillStyle = picture.pixel(x, y);
            context.fillRect(x * scale, y * scale, scale, scale);
        }
    }
}