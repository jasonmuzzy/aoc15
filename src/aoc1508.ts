import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    return inputs.reduce((pv, input) => {
        let str = '';
        if (part === 1) { // Part 1: decode
            let esc = false;
            for (let i = 0; i < input.length; i++) {
                const c = input[i];
                if (esc) {
                    if (c === '\\' || c === '"') str += c;
                    else if (c === 'x') {
                        str += String.fromCharCode(parseInt(input.substring(i + 1, i + 3), 16));
                        i += 2;
                    }
                    esc = false;
                } else {
                    if (c === '\\') esc = true;
                    else str += c;
                }
            }
            return pv + 2 + input.length - str.length;
        } else { // Part 2: encode
            return pv + 2 + input.split('').reduce((pv, c) => pv + ('\\"'.indexOf(c) !== -1 ? 1 : 0), 0);
        }
    }, 0);
}

run(__filename, solve);