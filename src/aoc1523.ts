import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const instructions = inputs.map(input => input.split(/, \+?| /));
    const registers = new Map([['a', part - 1], ['b', 0]]);
    let pointer = 0;
    while (pointer < instructions.length) {
        const [op, op1, op2] = instructions[pointer];
        if (op === 'hlf') registers.set(op1, Math.floor((registers.get(op1) ?? 0) / 2));
        else if (op === 'tpl') registers.set(op1, (registers.get(op1) ?? 0) * 3);
        else if (op === 'inc') registers.set(op1, (registers.get(op1) ?? 0) + 1);
        else if (op === 'jmp') pointer += parseInt(op1) - 1;
        else if (op === 'jie' && (registers.get(op1) ?? 0) % 2 === 0) pointer += parseInt(op2) - 1;
        else if (op === 'jio' && (registers.get(op1) ?? 0) === 1) pointer += parseInt(op2) - 1;
        pointer++;
    }
    return registers.get(test ? 'a' : 'b') ?? 0;
}

run(__filename, solve);