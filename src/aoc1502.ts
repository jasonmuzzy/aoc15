import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    return inputs.reduce((feet, box) => {
        const [l, w, h] = box.split('x').map(Number).sort((a, b) => a - b);
        return feet + (part === 1
            ? 3 * l * w + 2 * w * h + 2 * h * l // square feet of wrapping paper
            : 2 * l + 2 * w + l * w * h); // linear feet of ribbon
    }, 0);
}

run(__filename, solve);