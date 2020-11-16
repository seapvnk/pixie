import Picture, { PaintingProps } from "../model/Picture";

export default function floodFill(x: number, y: number, oldColor: string, color: string, 
        picture: Picture, painted: Array<PaintingProps> = []) {
        
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