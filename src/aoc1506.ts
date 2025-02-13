import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const lights = Array(1_000_000).fill(0);
    for (let instruction of inputs) {
        const [x1, y1, x2, y2] = (instruction.match(/\d+/g) ?? [0, 0, 0, 0]).map(Number);
        for (let y = y1; y <= y2; y++) {
            for (let x = x1; x <= x2; x++) {
                const i = y * 1000 + x;
                if (instruction.startsWith('turn on')) {
                    if (part === 1) lights[i] = 1;
                    else lights[i]++;
                } else if (instruction.startsWith('turn off')) {
                    if (part === 1) lights[i] = 0;
                    else lights[i] = Math.max(0, lights[i] - 1);
                } else if (part === 1) lights[i] = [1, 0][lights[i]];
                else lights[i] += 2;
            }
        }
    }
    return lights.reduce((pv, cv) => pv + cv);
}

run(__filename, solve);