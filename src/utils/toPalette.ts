export default function toPalette(palette: string) {
    return palette
        .split('#')
        .map(color => `#${color}`)
        .splice(1);
}