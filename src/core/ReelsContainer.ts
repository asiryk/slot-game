import * as PIXI from 'pixi.js';
import Reel from './Reel';

export default class ReelsContainer {
    public readonly reels: Array<Reel> = [];
    public readonly container: PIXI.Container;

    constructor(app: PIXI.Application) {
        const REEL_OFFSET_LEFT = 70;
        const NUMBER_OF_REELS = 3;
        this.container = new PIXI.Container();

        for (let i = 0; i < NUMBER_OF_REELS; i++) {
            const reel = new Reel(app, i);
            this.reels.push(reel);
            this.container.addChild(reel.container);
        }
        this.container.x = REEL_OFFSET_LEFT;
    }

    async spin() {
        const start = Date.now();
        for await (let value of this.infiniteSpinning()) {
            if (Date.now() >= start + 2000) break;
        }

        const arr = this.reels.map(reel => reel.sprites[1]);
        return this.checkIfWin(arr);
    }

    private async* infiniteSpinning() {
        while (true) {
            for (let i = 0; i < this.reels.length; i++) {
                if (i === this.reels.length - 1) {
                    await this.reels[i].spinOneTime();
                    this.blessRNG();
                    yield;
                }

                this.reels[i].spinOneTime();
            }
        }
    }

    private checkIfWin(symbols: Array<PIXI.Sprite>): boolean {
        // Set of strings: 'SYM1', 'SYM2', ...
        //
        const combination: Set<string> = new Set();
        symbols.forEach(symbol => combination.add(symbol.texture.textureCacheIds[0].split('.')[0]));
        if (combination.size === 1 && !combination.has('SYM1')) return true;
        return combination.size === 2 && combination.has('SYM1');
    }

    private blessRNG() {
        this.reels.forEach(reel => {
            reel.sprites[0].texture = reel.textures[Math.floor(Math.random() * reel.textures.length)];
        });
    }
}
