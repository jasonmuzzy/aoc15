import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const weights = inputs.map(Number);
    const target = weights.reduce((total, weight) => total + weight) / (part === 1 ? 3 : 4);

    function group(total: number, taken: number[], available: [number, number][], groupIndexes: number[][]) {
        for (let [i, weight] of available) {
            if (total + weight === target) {
                groupIndexes.push([...taken, i]);
            } else if (total + weight < target) {
                group(total + weight, [...taken, i], available.filter(([j, _]) => j > i), groupIndexes);
            }
        }
    }

    const groupIndexes: number[][] = [];;
    group(0, [], [...weights.entries()], groupIndexes);
    const qe = (indexes: number[]) => indexes.reduce((t, i) => t * weights[i], 1);
    const groups = groupIndexes.toSorted((a, b) => a.length !== b.length ? a.length - b.length : qe(a) - qe(b));

    const group1 = groups.find((group1, g1i) => {
        for (let [g2i, group2] of groups.entries().filter(([g2i, group2]) => g2i > g1i && group2.every(i => !group1.includes(i)))) {
            for (let [g3i, group3] of groups.entries().filter(([g3i, group3]) => g3i > g2i && group3.every(i => !group1.includes(i) && !group2.includes(i)))) {
                if (part === 1 && weights.every((_, wi) => group1.includes(wi) || group2.includes(wi) || group3.includes(wi))) {
                    return true;
                } else if (part === 2) {
                    for (let [g4i, group4] of groups.entries().filter(([g4i, group4]) => g4i > g3i && group4.every(i => !group1.includes(i) && !group2.includes(i) && !group3.includes(i)))) {
                        if (weights.every((_, wi) => group1.includes(wi) || group2.includes(wi) || group3.includes(wi) || group4.includes(wi))) {
                            return true;
                        }
                    }
                }
            }
        }
    });

    if (group1) return qe(group1);
    else throw new Error('No solution found');
}

run(__filename, solve);