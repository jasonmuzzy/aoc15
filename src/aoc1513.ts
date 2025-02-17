import { run } from 'aoc-copilot';
import { permutations } from 'aoc-copilot/dist/utils';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {

    // Parse each person's happiness gain/loss when seated next to each other person, e.g.
    // "Alice would gain 54 happiness units by sitting next to Bob."
    const sentiments = inputs
        .map(input => input.split(/\s|\./g)
            .filter((_, i) => [0, 2, 3, 10].includes(i)))
        .reduce((graph, [p1, d, v, p2]) => {
            graph.set(p1, (graph.get(p1) ?? new Map()).set(p2, parseInt((d === 'lose' ? '-' : '') + v)));
            return graph;
        }, new Map() as Map<string, Map<string, number>>);

    // For part 2, seat myself with 0 happiness gain/loss (guests are neutral about me and me about them)
    if (part === 2) {
        sentiments.forEach(sentiment => sentiment.set('Myself', 0));
        sentiments.set('Myself', new Map([...sentiments.keys()].map(p2 => [p2, 0])));
    }

    // Find the circular seating arrangement that results in the greatest happiness change
    return permutations([...sentiments.keys()]).reduce((max, arr) => {
        const sum = arr.reduce((sum, person, i, arr) => {
            const neighbors = sentiments.get(person);
            return sum
                + (neighbors?.get(arr.at(i - 1)!) ?? 0) // arr never empty inside reduce
                + (neighbors?.get(arr[(i + 1) % arr.length]) ?? 0);
        }, 0);
        return sum > max ? sum : max;
    }, -Infinity);

}

run(__filename, solve);