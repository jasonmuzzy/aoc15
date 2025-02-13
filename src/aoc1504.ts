import { createHash } from 'node:crypto';

import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = -1, hash = '';
    do {
        answer++;
        hash = createHash('md5').update(inputs[0] + answer).digest('hex');
    } while (hash.substring(0, part + 4) !== '0'.repeat(part + 4));
    return answer;
}

run(__filename, solve);