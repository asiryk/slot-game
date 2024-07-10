import Loader from "./Loader";
import PlayButton from "./PlayButton";
import Background from "./Background";
import ReelsContainer from "./ReelsContainer";
import Scoreboard from "./Scoreboard";
import VictoryScreen from "./VictoryScreen";
import { Application } from "pixi.js";

export default class Game {
    public app: Application;
    private loader: Loader;
    private playBtn: PlayButton;
    private reelsContainer: ReelsContainer;
    private scoreboard: Scoreboard;
    private victoryScreen: VictoryScreen;

    constructor() {
        this.app = new Application();
    }

    public async init() {
        await this.app.init({ width: 960, height: 536 });
        this.loader = new Loader(this.app);
        window.document.body.appendChild(this.app.canvas);
        await this.loader.loadAssets();
        this.createScene();
        this.createPlayButton();
        this.createReels();
        this.createScoreboard();
        this.createVictoryScreen();
    }

    private createScene() {
        const bg = new Background();
        this.app.stage.addChild(bg.sprite);
    }

    private createPlayButton() {
        this.playBtn = new PlayButton(this.app, this.handleStart.bind(this));
        this.app.stage.addChild(this.playBtn.sprite);
    }

    private createReels() {
        this.reelsContainer = new ReelsContainer(this.app);
        this.app.stage.addChild(this.reelsContainer.container);
    }

    private createScoreboard() {
        this.scoreboard = new Scoreboard(this.app);
        this.app.stage.addChild(this.scoreboard.container);
    }

    private createVictoryScreen() {
        this.victoryScreen = new VictoryScreen(this.app);
        this.app.stage.addChild(this.victoryScreen.container);
    }

    handleStart() {
        this.scoreboard.decrement();
        this.playBtn.setDisabled();
        this.reelsContainer.spin()
            .then(this.processSpinResult.bind(this));
    }

    private processSpinResult(isWin: boolean) {
        if (isWin) {
            this.scoreboard.increment();
            this.victoryScreen.show();
        }

        if (!this.scoreboard.outOfMoney) this.playBtn.setEnabled();
    }
}
