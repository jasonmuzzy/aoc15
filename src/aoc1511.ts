import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {

    // Check password rules
    const valid = (pw: string) => {

        // Check for invalid characters i, l or o
        let invalid = false;
        for (let c of 'ilo') {
            if (pw.indexOf(c) !== -1) {
                invalid = true;
                break;
            }
        }
        if (invalid) return false;

        // Check for straight of 3 characters like abc, bcd, cde, etc.
        const abc = 'abcdefghijklmnopqrstuvwxyz';
        let straight = false;
        for (let i = 0, window = 'abc'; i < 24; i++, window = abc.substring(i, i + 3)) {
            if (pw.indexOf(window) !== -1) {
                straight = true;
                break;
            }
        }
        if (!straight) return false;

        // Check for 2 non-overlapping pairs
        let pairs = 0, prevc = '';
        for (let i = 0, c = pw[i]; i < pw.length; i++, c = pw[i]) {
            if (c === prevc) {
                pairs++;
                prevc = ''; // Avoid overlapping pairs
            } else {
                prevc = c;
            }
            if (pairs === 2) break;
        }
        return pairs === 2;
    }

    const abc = 'abcdefghjkmnpqrstuvwxyzijlmop';
    const pw = inputs[0].split('');
    for (let p = 0; p < part; p++) {
        do {
            let i = pw.length - 1;
            if (pw[i] === 'z') {
                while (pw[i] === 'z') {
                    pw[i] = 'a';
                    i--;
                }
            }
            pw[i] = abc[abc.indexOf(pw[i]) + 1];
        } while (!valid(pw.join('')));
    }

    return pw.join('');

}

run(__filename, solve);