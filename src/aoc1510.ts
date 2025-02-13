import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let seq = inputs[0], next = '';
    for (let i = 0; i < (part === 1 ? 40 : 50); i++) {
        next = '';
        let prevc = '', count = 0;
        for (let c of seq) {
            if (c === prevc) {
                count++;
            } else {
                if (prevc !== '') {
                    next += `${count}${prevc}`;
                }
                prevc = c;
                count = 1;
            }
        }
        if (prevc !== '') {
            next += `${count}${prevc}`;
        }
        seq = next;
    }
    return seq.length;
}

run(__filename, solve);