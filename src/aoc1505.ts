import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    return inputs.reduce((pv, cv) => {
        let nice = 0;
        if (part === 1 &&
            (cv.match(/[aeiou]/g) ?? []).length >= 3 &&
            /aa|bb|cc|dd|ee|ff|gg|hh|ii|jj|kk|ll|mm|nn|oo|pp|qq|rr|ss|tt|uu|vv|ww|xx|yy|zz/.test(cv) &&
            !/ab|cd|pq|xy/.test(cv) ? 1 : 0
        ) nice = 1;
        else if (part === 2) {
            let pair = false, repeat = false;
            for (let [i, c] of cv.split('').entries()) {
                if (cv.length - i >= 2 && cv.substring(i + 2).indexOf(cv.substring(i, i + 2)) !== -1) pair = true;
                if (cv.length - i >= 3 && cv[i + 2] === c) repeat = true;
                if (pair && repeat) {
                    nice = 1;
                    break;
                }
            }
        }
        return pv + nice;
    }, 0);
}

run(__filename, solve);