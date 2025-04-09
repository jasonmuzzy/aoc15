import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {

    let [replacements, molecule] = inputs.join('\n').split('\n\n').map((v, i) => i === 0
        ? v.split('\n').map(v => v.split(' => '))
        : v
    ) as [string[][], string];

    if (part === 1) {
        const molecules: Set<string> = new Set();
        for (let [i, atom] of molecule.split(/(?=[A-Z])/).entries()) {
            for (let replacement of replacements.filter(v => v[0] === atom).map(v => v[1])) {
                molecules.add([...molecule.slice(0, i), replacement, ...molecule.slice(i + 1)].join(''));
            }
        }
        return molecules.size;
    } else {
        // Greedy replace R to L
        // I tried BFS, A*, starting with e, working backwards from the target molecule, only doing non-overlapping replacements,
        // generating all possible combos and more but all had too large of a search space.
        // I finally looked on Reddit and found https://www.reddit.com/r/adventofcode/comments/3xflz8/comment/cy4etju/
        let count = 0;
        while (molecule !== 'e') {
            for (let start = molecule.length - 1; start >= 0; start--) {
                const rule = replacements.find(([from, to]) => molecule.substring(start).includes(to) && (from !== 'e' || to === molecule));
                if (rule !== undefined) {
                    count++;
                    molecule = molecule.substring(0, start) + molecule.substring(start).replace(rule[1], rule[0]);
                    break;
                }
            }
        }
        return count;
    }
}

run(__filename, solve);