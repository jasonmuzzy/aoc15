import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const santa = { x: 0, y: 0 };
    const robo = { x: 0, y: 0 };
    const houses = new Set(['0,0']);
    for (let offset = 0; offset < inputs[0].length; offset += part) {
        santa.x += inputs[0][offset] === '>' ? 1 : inputs[0][offset] === '<' ? -1 : 0;
        santa.y += inputs[0][offset] === 'v' ? 1 : inputs[0][offset] === '^' ? -1 : 0;
        houses.add(`${santa.x},${santa.y}`);
        if (part === 2 && offset < inputs[0].length -1) {
            robo.x += inputs[0][offset + 1] === '>' ? 1 : inputs[0][offset + 1] === '<' ? -1 : 0;
            robo.y += inputs[0][offset + 1] === 'v' ? 1 : inputs[0][offset + 1] === '^' ? -1 : 0;
            houses.add(`${robo.x},${robo.y}`);
        }
    }
    return houses.size;
}

run(__filename, solve);