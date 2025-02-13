import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let floor = 0, firstBasement = 0;
    for (let [i, paren] of inputs[0].split('').entries()) {
        floor += paren === '(' ? 1 : -1;
        if (part === 2 && floor < 0) {
            firstBasement = i + 1;
            break;
        }
    }
    return part === 1 ? floor : firstBasement;
}

run(__filename, solve);