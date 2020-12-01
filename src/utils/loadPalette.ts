import toPalette from "./toPalette";

export default function loadPalette(setColorPalette: Function) {
    return () => {
        const newPalette = prompt('Your palette');

        if (newPalette) {
            const newPaletteArray = toPalette(newPalette);

            if (newPaletteArray && newPaletteArray.length > 2) {
                setColorPalette(newPaletteArray);
            }
        }
    
    }

}