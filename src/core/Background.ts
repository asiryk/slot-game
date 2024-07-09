import { Container, Loader, Sprite, Texture } from "pixi.js";

export default class Background {
    public readonly sprite: Container;
    private readonly texture: Texture;

    constructor(loader: Loader) {
        this.texture = loader.resources.atlas.textures!['BG.png'];
        this.sprite = new Sprite(this.texture);
    }
}
