import * as PIXI from 'pixi.js';

export default class Loader {
    loader: PIXI.Loader;

    constructor(app: PIXI.Application, onAssetsLoaded: () => void) {
        this.loader = app.loader;
        this.loadAssets();
        this.loader.load(onAssetsLoaded);
    }

    loadAssets() {
        this.loader.add('atlas', './assets/atlas.json');
    }
}
