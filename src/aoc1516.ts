import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {

    const giver: { [key: string]: number } = {
        children: 3,
        cats: 7,
        samoyeds: 2,
        pomeranians: 3,
        akitas: 0,
        vizslas: 0,
        goldfish: 5,
        trees: 3,
        cars: 2,
        perfumes: 1
    }

    return inputs.findIndex(row => {
        const [_, compounds] = row.split(/^Sue \d+: /);
        return compounds.split(', ').map(kv => kv.split(': ')).every(([compound, v]) => {
            const kinds = parseInt(v);
            return (part === 2 && (compound === 'cats' || compound === 'trees'))
                ? kinds > giver[compound]
                : (part === 2 && (compound === 'pomeranians' || compound === 'goldfish'))
                    ? kinds < giver[compound]
                    : kinds === giver[compound];
        });
    }) + 1;
}

run(__filename, solve);