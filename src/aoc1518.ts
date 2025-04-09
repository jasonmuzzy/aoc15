import { run } from 'aoc-copilot';
import { adjacents } from 'aoc-copilot/dist/utils';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let grid = inputs.map(row => row.split(''));
    if (part === 2) { // Stuck pixels
        grid[0][0] = '#';
        grid[0][test ? 5 : 99] = '#';
        grid[test ? 5 : 99][0] = '#';
        grid[test ? 5 : 99][test ? 5 : 99] = '#';
    }
    for (let cycle = 0; cycle < (test ? part === 1 ? 4 : 5 : 100); cycle++) {
        const temp = grid.map(() => '.'.repeat(test ? 6 : 100).split(''));
        for (let [y, row] of grid.entries()) {
            for (let [x, light] of row.entries()) {
                    const count = adjacents(x, y, grid[0].length, grid.length, true).reduce((count, [x1, y1]) => {
                        return count + (grid[y1][x1] === '#' ? 1 : 0);
                    }, 0);
                    if ((light === '#' && count >= 2 && count <= 3) ||
                        (light === '.' && count === 3) ||
                        (part === 2 && (
                            (x === 0 && y === 0) ||
                            (x === 0 && y === (test ? 5 : 99)) ||
                            (x === (test ? 5 : 99) && y === 0) ||
                            (x === (test ? 5 : 99) && y === (test ? 5 : 99))
                        ))
                    ) {
                        temp[y][x] = '#';
                    }
            }
        }
        grid = temp.map(row => [...row]);
    }
    return grid.flat().filter(cell => cell === '#').length;
}

run(__filename, solve);