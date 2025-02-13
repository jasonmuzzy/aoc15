import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const parseGates = () => { return inputs.map(input => input.split(/ -> |\s/g)); }
    let gates = parseGates();
    const wires: Map<string, number> = new Map();
    const deref = (gate: string[], i: number) => {
        if (/[0-9]+/.test(gate[i])) return parseInt(gate[i]);
        else return wires.get(gate[i]);
    }
    for (let p = 0; p < part; p++) {
        while (gates.length > 0) {
            for (let i = gates.length - 1; i >= 0; i--) { // Start from end for safe splice
                const gate = gates[i];
                let val: number | undefined = undefined;
                const op = ['SET', gate[0], gate[1]][gate.length - 2];
                if (op === 'SET') {
                    val = deref(gate, 0);
                } else if (op === 'NOT') {
                    val = deref(gate, 1);
                    if (val !== undefined) val ^= (2 ** 16 - 1);
                } else {
                    const op1 = deref(gate, 0);
                    const op2 = deref(gate, 2);
                    if (op1 !== undefined && op2 !== undefined) {
                        if (op === 'OR') val = op1 | op2;
                        else if (op === 'AND') val = op1 & op2;
                        else if (op === 'LSHIFT') val = op1 << op2;
                        else if (op === 'RSHIFT') val = op1 >> op2;
                    }
                }
                if (val !== undefined) {
                    wires.set(gate[gate.length - 1], val);
                    gates.splice(i, 1);
                }
            }
        }
        if (part === 2 && p === 0) {
            const a = wires.get('a') ?? 0;
            wires.clear();
            gates = parseGates();
            wires.set('b', a);
        }
    }
    return wires.get('a') ?? 0;
}

run(__filename, solve);