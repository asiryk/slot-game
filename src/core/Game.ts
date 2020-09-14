import * as PIXI from 'pixi.js';
import Loader from './Loader';
import PlayButton from './PlayButton';
import Background from './Background';
import ReelsContainer from './ReelsContainer';

export default class Game {
    public app: PIXI.Application;
    private playBtn: PlayButton;
    private width = 960;
    private height = 536;
    private reels: ReelsContainer;

    constructor() {
        this.app = new PIXI.Application({ width: this.width, height: this.height });
        window.document.body.appendChild(this.app.view);
        new Loader(this.app, this.init.bind(this));
    }

    init() {
        this.createScene();
        this.createPlayButton();
        this.createReels();
    }

    createScene() {
        const bg = new Background(this.app.loader);
        this.app.stage.addChild(bg.sprite);
    }

    createPlayButton() {
        this.playBtn = new PlayButton(this.app, this.handleStart.bind(this));
        this.app.stage.addChild(this.playBtn.sprite);
    }

    createReels() {
        this.reels = new ReelsContainer(this.app);
        this.app.stage.addChild(this.reels.container);
    }

    handleStart() {
        const start = Date.now();
        this.playBtn.setDisabled();
        const tick = () => {
            this.reels.elements.forEach((reel, index) => {
                reel.spinOneTime()
                    .then(() => {
                        if (index === this.reels.elements.length - 1 && Date.now() >= start + 2000) {
                            this.playBtn.setActive();
                            this.app.ticker.remove(tick);
                        }
                    });
            });
        };
        this.app.ticker.add(tick);

    }
}