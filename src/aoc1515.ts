import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const ingredients = inputs.map(input => input.match(/-?\d+/g)!.map(Number));

    function calories(counts: number[]) {
        return ingredients.reduce((calories, ingredient, i) => {
            return calories + ingredient[4] * counts[i];
        }, 0);
    }

    function score(counts: number[]) {
        return part === 2 && calories(counts) !== 500
            ? 0
            : [...Array(4).keys()].reduce((score, propertyi) => {
                return score * Math.max(0, ingredients.reduce((propScore, ingredient, i) => {
                    return propScore + ingredient[propertyi] * counts[i];
                }, 0));
            }, 1);
    }

    for (let a = 0; a <= 100; a++) {
        for (let b = test ? 100 - a : 0; b <= 100 - a; b++) {
            if (test) {
                answer = Math.max(answer, score([a, b]));
            } else {
                for (let c = 0; c <= 100 - a - b; c++) {
                    for (let d = 100 - a - b - c; d <= 100 - a - b - c; d++) {
                        answer = Math.max(answer, score([a, b, c, d]));
                    }
                }
            }
        }
    }
    return answer;
}

run(__filename, solve);