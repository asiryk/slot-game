import { Application, Assets, Container, Sprite, Texture, Ticker } from "pixi.js";

export default class Reel {
    public readonly container: Container;
    public readonly textures: Array<Texture>;
    public sprites: Array<Sprite> = [];
    private readonly appHeight: number;
    private readonly ticker: Ticker;

    constructor(app: Application, position: number) {
        this.appHeight = app.screen.height;
        this.ticker = app.ticker;
        this.container = new Container();
        const atlas = Assets.get("atlas");
        this.textures = [
            atlas.textures["SYM1.png"],
            atlas.textures["SYM2.png"],
            atlas.textures["SYM3.png"],
            atlas.textures["SYM4.png"],
            atlas.textures["SYM5.png"],
            atlas.textures["SYM6.png"],
        ];
        this.generate(position);
    }

    private generate(position: number) {
        const REEL_WIDTH = 230;
        const REEL_OFFSET_BETWEEN = 10;
        const NUMBER_OF_ROWS = 3;
        this.container.x = position * REEL_WIDTH;

        for (let i = 0; i < NUMBER_OF_ROWS + 1; i++) {
            const symbol = new Sprite(this.textures[Math.floor(Math.random() * this.textures.length)]);
            symbol.scale.set(0.8);
            const widthDiff = REEL_WIDTH - symbol.width;
            symbol.x = position * REEL_OFFSET_BETWEEN + widthDiff / 2;
            const yOffset = (this.appHeight - symbol.height * 3) / 3;
            const cellHeight = symbol.height + yOffset;
            const paddingTop = yOffset / 2;
            symbol.y = (i - 1) * cellHeight + paddingTop;
            this.sprites.push(symbol);
            this.container.addChild(symbol);
        }
    }

    spinOneTime() {
        let speed = 50;
        let doneRunning = false;
        let yOffset = (this.appHeight - this.sprites[0].height * 3) / 3 / 2;

        return new Promise<void>(resolve => {
            const tick = () => {
                for (let i = this.sprites.length - 1; i >= 0; i--) {
                    const symbol = this.sprites[i];

                    if (symbol.y + speed > this.appHeight + yOffset) {
                        doneRunning = true;
                        speed = this.appHeight - symbol.y + yOffset;
                        symbol.y = -(symbol.height + yOffset);
                    } else {
                        symbol.y += speed;
                    }

                    if (i === 0 && doneRunning) {
                        let t = this.sprites.pop();
                        if (t) this.sprites.unshift(t);
                        this.ticker.remove(tick);
                        resolve();
                    }
                }
            }

            this.ticker.add(tick);
        });
    }
}
