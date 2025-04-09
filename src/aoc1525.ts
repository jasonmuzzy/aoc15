import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const [codeRow, codeCol] = (inputs[0].match(/\d+/g) ?? []).map(Number);
    let row = 1, maxRow = 1, col = 1, code = 20151125;
    while (row !== codeRow || col !== codeCol) {
        code = (code * 252533) % 33554393;
        row = row === 1 ? maxRow + 1 : row - 1;
        maxRow = Math.max(maxRow, row);
        col = row === maxRow ? 1 : col + 1;
    }
    return code;
}

run(__filename, solve);