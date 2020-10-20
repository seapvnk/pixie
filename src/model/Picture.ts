class Picture {
    width: number;
    height: number;
    pixels: Array<string>;
    scale: number;

    constructor(width: number, height: number, pixels: Array<string>, scale = 10) {
        this.width = width;
        this.height = height;
        this.pixels = pixels;
        this.scale = scale;
    }

    static empty(width: number, height: number, color: string) {
        const pixels = new Array<string>(width * height).fill(color);
        return new Picture(width, height, pixels);
    }

    pixel(x: number, y: number) {
        return this.pixels[x + y * this.width];
    }

}

export default Picture;