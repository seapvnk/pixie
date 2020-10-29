interface PaintingProps {
    x: number;
    y: number;
    color: string;
}

class Picture {
    width: number;
    height: number;
    pixels: Array<string>;
    scale: number;

    constructor(width: number, height: number, pixels: Array<string>, scale = 16) {
        this.width = width;
        this.height = height;
        this.pixels = pixels;
        this.scale = scale;
    }

    static empty(width: number, height: number, color: string, scale = 16) {
        const pixels = new Array<string>(width * height).fill(color);
        return new Picture(width, height, pixels, scale);
    }

    pixel(x: number, y: number) {
        return this.pixels[x + y * this.width];
    }

    setPixel(x: number, y: number, color: string) {
        const newPicture = new Picture(this.width, this.height, this.pixels, this.scale);
        newPicture.pixels[x + y * this.width] = color;
        return newPicture;
    }

    fillAt(x: number, y: number, color: string) {
        const around = [
            {dx: -1, dy: 0}, {dx: 1, dy: 0},
            {dx: 0, dy: -1}, {dx: 0, dy: 1},
        ];

        const painted: Array<PaintingProps> = [{x, y, color}];
        for (let done = 0; done < painted.length; done++) {
            for (let {dx, dy}  of around) {
                const x = painted[done].x + dx; 
                const y = painted[done].y + dy;
                
                const betweenRange = (min: number, max: number) => (n: number) => n >= min && n < max;
                const isPaintedAt = (x: number, y: number) => (p:PaintingProps) => p.x === x && p.y === y;
                
                const inRangeX = betweenRange(0, this.width);
                const inRangeY = betweenRange(0, this.height);
                const samePixelColor = this.pixel(x, y) === color;
                const notPainted = !painted.some(isPaintedAt(x, y));

                if (inRangeX(x) && inRangeY(y) && samePixelColor && notPainted) {
                    painted.push({ x, y, color });
                }
            }
        }
        
        return this.draw(painted)
    }

    draw(painted: PaintingProps[]) {
        let newPainting:Picture = this;
        painted.forEach(({ x, y, color }) => {
            newPainting = this.setPixel(x, y, color)
        });

        return newPainting;
    }

}

export default Picture;