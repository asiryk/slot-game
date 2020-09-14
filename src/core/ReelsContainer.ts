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

    blessRNG() {
        this.reels.forEach(reel => {
            reel.sprites[0].texture = reel.textures[Math.floor(Math.random() * reel.textures.length)];
        });
    }
}
