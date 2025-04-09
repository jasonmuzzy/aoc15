import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {

    const boss = (() => {
        const [hp, hit, ac] = (inputs.join('').match(/\d+/g) ?? ['0', '0', '0']).map(Number)
        return { hp, hit, ac };
    })();

    const weapons = [
        { name: 'dagger', cost: 8, damage: 4, armor: 0 },
        { name: 'shortsword', cost: 10, damage: 5, armor: 0 },
        { name: 'warhammer', cost: 25, damage: 6, armor: 0 },
        { name: 'longsword', cost: 40, damage: 7, armor: 0 },
        { name: 'greataxe', cost: 74, damage: 8, armor: 0 }
    ];

    const armors = [
        { name: 'none', cost: 0, damage: 0, armor: 0 },
        { name: 'leather', cost: 13, damage: 0, armor: 1 },
        { name: 'chainmail', cost: 31, damage: 0, armor: 2 },
        { name: 'splintmail', cost: 53, damage: 0, armor: 3 },
        { name: 'bandedmail', cost: 75, damage: 0, armor: 4 },
        { name: 'platemail', cost: 102, damage: 0, armor: 5 }
    ];

    const rings = [
        { name: 'none', cost: 0, damage: 0, armor: 0 },
        { name: 'damage +1', cost: 25, damage: 1, armor: 0 },
        { name: 'damage +2', cost: 50, damage: 2, armor: 0 },
        { name: 'damage +3', cost: 100, damage: 3, armor: 0 },
        { name: 'defense +1', cost: 20, damage: 0, armor: 1 },
        { name: 'defense +2', cost: 40, damage: 0, armor: 2 },
        { name: 'defense +3', cost: 80, damage: 0, armor: 3 }
    ];

    let minWin = Infinity, maxLose = 0;

    for (let weapon of weapons) {
        for (let armor of armors) {
            for (let ring1 of rings) {
                for (let ring2 of rings) {
                    if (ring2.name === 'none' || ring2 !== ring1) {
                        const cost = weapon.cost + armor.cost + ring1.cost + ring2.cost;
                        const hit = weapon.damage + armor.damage + ring1.damage + ring2.damage;
                        const ac = weapon.armor + armor.armor + ring1.armor + ring2.armor;
                        let hp = 100, bossHp = boss.hp;

                        while (hp > 0 && bossHp > 0) {
                            bossHp -= Math.max(1, hit - boss.ac);
                            if (bossHp > 0) hp -= Math.max(1, boss.hit - ac);
                        }

                        if (hp > 0 && bossHp <= 0) {
                            minWin = Math.min(minWin, cost);
                        } else {
                            maxLose = Math.max(maxLose, cost);
                        }

                    }
                }
            }
        }
    }

    return part === 1 ? minWin : maxLose;
}

run(__filename, solve);