import * as PIXI from 'pixi.js';

export default class Background {
    public readonly sprite: PIXI.Container;
    private readonly texture: PIXI.Texture;

    constructor(loader: PIXI.Loader) {
        this.texture = loader.resources!.atlas.textures!['BG.png'];
        this.sprite = new PIXI.Sprite(this.texture);
    }
}
