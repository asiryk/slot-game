import { Application, Assets, Text, TextStyle } from "pixi.js"

export default class Loader {
    private loadingScreen: Text;
    private app: Application;

    constructor(app: Application) {
        this.app = app;
        this.loadingScreen = this.createLoadingScreen(app.screen.width, app.screen.height);
    }

    public showLoadingScreen() {
        this.app.stage.addChild(this.loadingScreen);
    }

    public hideLoadingScreen() {
        this.app.stage.removeChild(this.loadingScreen);
    }

    public async loadAssets() {
        this.showLoadingScreen();
        Assets.add({ alias: "atlas", src: "./assets/atlas.json" });
        await Assets.load(["atlas"]);
        this.hideLoadingScreen();
    }

    private createLoadingScreen(appWidth: number, appHeight: number): Text {
        const style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fontWeight: "bold",
            fill: "#ffffff",
        });
        const playText = new Text({ text: "Loading...", style });
        playText.x = (appWidth - playText.width) / 2;
        playText.y = (appHeight - playText.height) / 2;
        return playText;
    }
}
