import { run } from 'aoc-copilot';
import { permutations } from 'aoc-copilot/dist/utils';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const graph: Map<string, Map<string, number>> = new Map();
    for (let input of inputs) {
        const [city1, city2, d] = input.split(/ to | = /g).map((v, i) => i === 2 ? parseInt(v) : v) as [string, string, number];
        graph.set(city1, (graph.get(city1) ?? new Map()).set(city2, d));
        graph.set(city2, (graph.get(city2) ?? new Map()).set(city1, d));
    }
    const perms = permutations([...graph.keys()]);
    return perms.reduce((minmax, cv) => {
        const d = cv.slice(0, cv.length - 1).reduce((sum, v, i) => sum + (graph.get(v)?.get(cv[i + 1]) ?? 0), 0)
        return (part === 1 && d < minmax) || (part === 2 && d > minmax) ? d : minmax;
    }, part === 1 ? Infinity : 0);
}

run(__filename, solve);