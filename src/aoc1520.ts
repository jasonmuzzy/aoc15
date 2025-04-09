import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const min = parseInt(inputs[0]);
    const ppe = part === 1 ? 10 : 11; // Presents per elf
    for (let house = 1; house <= Math.ceil(min / ppe); house++) {
        const elves = [...divisors(house)].filter(elf => part === 1 || house <= elf * 50);
        const presents = elves.reduce((count, elf) => count += elf * ppe, 0);
        if (presents >= min) return house;
    }
    throw new Error('No solution found');
}

function divisors(n: number) {
    const divisors: Set<number> = new Set();
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            divisors.add(i);
            divisors.add(n / i);
        }
    }
    return divisors;
}

run(__filename, solve);