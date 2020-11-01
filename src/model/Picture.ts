export interface PaintingProps {
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

    draw(picture: Picture, painted: Array<PaintingProps> = []): Picture {
        if (painted.length > 0) {
            const pixel = painted.pop();
            if (pixel) {
                const paintedPicture = this.setPixel(pixel?.x, pixel?.y, pixel?.color);
                return this.draw(paintedPicture, painted);
            }

            return picture;

        } else {
            return picture;
        }
    }

}

export default Picture;