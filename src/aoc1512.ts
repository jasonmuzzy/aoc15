import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    if (part === 2) {
        const isRed = (e: any) => !Array.isArray(e) && typeof e === 'object' && Object.values(e).includes('red');
        const removeReds = (json: any) => {
            if (Array.isArray(json)) {
                for (let [i, e] of json.entries()) {
                    if (isRed(e)) {
                        json[i] = 0;
                    } else {
                        removeReds(e);
                    }
                }
            } else if (typeof json === 'object') {
                for (let k in json) {
                    if (isRed(json[k])) {
                        delete json[k];
                    } else {
                        removeReds(json[k]);
                    }
                }
            }
        }
        const json = JSON.parse(inputs[0]);
        if (isRed(json)) {
            return 0;
        } else {
            removeReds(json);
        }
        inputs[0] = JSON.stringify(json);
    }
    return inputs[0].match(/-?\d+/g)?.reduce((pv, cv) => pv + parseInt(cv), 0) ?? 0;
}

run(__filename, solve);