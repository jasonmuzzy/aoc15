import { run } from 'aoc-copilot';
import * as heap from 'aoc-copilot/dist/heap';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {

    class Instant {
        name: string;
        cost: number;
        attack: number;
        heal: number;

        constructor(name: string, cost: number, attack: number, heal: number) {
            this.name = name;
            this.cost = cost;
            this.attack = attack;
            this.heal = heal;
        }
    }

    class Effect extends Instant {
        duration: number;
        armor: number;
        restore: number;
        timer: number;

        constructor(name: string, cost: number, attack: number, heal: number, duration: number, armor: number, restore: number, timer: number) {
            super(name, cost, attack, heal);
            this.duration = duration;
            this.armor = armor;
            this.restore = restore;
            this.timer = timer;
        }
    }

    const bossAttack = parseInt(inputs[1].split(' ')[1]);

    const spells: Instant[] = [];
    spells.push(
        new Instant('Magic Missile', 53, 4, 0),
        new Instant('Drain', 73, 2, 2),
        new Effect('Shield', 113, 0, 0, 6, 7, 0, 0),
        new Effect('Poison', 173, 3, 0, 6, 0, 0, 0),
        new Effect('Recharge', 229, 0, 0, 5, 0, 101, 0)
    );

    const q: [number, number, number, number, number, Effect[]][] = [[
        0, // Spent
        0, // Turn
        test ? 10 : 50, // Player HP
        test ? 250 : 500, // Player mana
        parseInt(inputs[0].split(' ')[2]), // Boss HP
        [] // Active effects
    ]];

    while (q.length > 0) {

        let [spent, turn, playerHp, playerMana, bossHp, effects] = heap.pop(q)!;

        if (bossHp <= 0) return spent;
        else if (playerHp <= 0) continue;

        // Apply effects at start of turn
        let magicArmor = 0;
        for (let effect of effects) {
            bossHp -= effect.attack;
            magicArmor += effect.armor;
            playerMana += effect.restore;
            effect.timer--;
        }

        // Remove expired effects
        for (let i = effects.length - 1; i >= 0; i--) {
            if (effects[i].timer === 0) {
                effects.splice(i, 1);
            }
        }

        if (turn % 2 === 0) { // Player turn
            // Hard mode
            if (part === 2) {
                playerHp--;
            }

            for (let spell of spells.filter(spell => spell.cost <= playerMana)) {
                if (spell instanceof Effect && effects.findIndex(effect => effect.name === spell.name) === -1) {
                    heap.push(q, [
                        spent + spell.cost,
                        turn + 1,
                        playerHp,
                        playerMana - spell.cost,
                        bossHp,
                        effects.map(effect => ({ ...effect })).concat([{ ...spell, timer: spell.duration }])
                    ]);
                } else if (spell instanceof Instant) {
                    heap.push(q, [
                        spent + spell.cost,
                        turn + 1,
                        playerHp + spell.heal,
                        playerMana - spell.cost,
                        bossHp - spell.attack,
                        effects.map(effect => ({ ...effect }))
                    ]);
                }
            }

        } else { // Boss turn
            playerHp -= Math.max(1, bossAttack - magicArmor);
            heap.push(q, [
                spent,
                turn + 1,
                playerHp,
                playerMana,
                bossHp,
                effects.map(effect => ({ ...effect }))
            ]);
        }

    }

    throw new Error('No solution found');

}

run(__filename, solve);