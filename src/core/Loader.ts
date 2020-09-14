import * as PIXI from 'pixi.js';

export default class Loader {
    public loader: PIXI.Loader;
    private loadingScreen: PIXI.Text;

    constructor(app: PIXI.Application, onAssetsLoaded: () => void) {
        this.loader = app.loader;
        this.loadAssets();
        this.loader.load(() => {
            app.stage.removeChild(this.loadingScreen);
            onAssetsLoaded();
        });
        this.generateLoadingScreen(app.screen.width, app.screen.height);
        app.stage.addChild(this.loadingScreen);
    }

    private loadAssets() {
        this.loader.add('atlas', './assets/atlas.json');
    }

    private generateLoadingScreen(appWidth: number, appHeight: number) {
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontWeight: 'bold',
            fill: '#ffffff',
        });
        const playText = new PIXI.Text('Loading...', style);
        playText.x = (appWidth - playText.width) / 2;
        playText.y = (appHeight - playText.height) / 2;
        this.loadingScreen = playText;
    }
}
