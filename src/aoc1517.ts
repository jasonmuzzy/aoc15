import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const containers = inputs.map(Number);
    const eggnog = test ? 25 : 150;
    const counts: Map<number, number> = new Map();
    function combos(volume: number, index: number, count: number): void {
        for (let [i, c] of containers.slice(index).entries()) {
            if (volume + c === eggnog) {
                counts.set(count, (counts.get(count) ?? 0) + 1);
            } else if (volume + c < eggnog) {
                combos(volume + c, index + i + 1, part === 1 ? 0 : count + 1);
            }
        }
    }
    combos(0, 0, 0);
    return [...counts.entries()].sort((a, b) => a[0] - b[0])[0][1];
}

run(__filename, solve);