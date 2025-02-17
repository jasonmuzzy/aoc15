import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const reindeer = inputs.map(input => {
        const [km, sec, rest] = (input.match(/\d+/g)?.map(Number) ?? [0, 0, 0]);
        return { km, sec, rest, dist: 0, points: 0 };
    });
    const duration = test ? 1000 : 2503;
    for (let t = (part === 1 ? duration : 1); t <= duration; t++) {
        let lead = 0;
        for (let r of reindeer) {
            r.dist = r.km * (r.sec * Math.trunc(t / (r.sec + r.rest)) + Math.min(r.sec, t % (r.sec + r.rest)));
            lead = Math.max(lead, r.dist);
        }
        if (part === 2) {
            for (let r of reindeer) {
                if (r.dist === lead) r.points++;
            }
        }
    }
    return reindeer.reduce((max, r) => Math.max(max, part === 1 ? r.dist : r.points), 0);
}

run(__filename, solve);