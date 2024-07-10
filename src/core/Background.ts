import { Assets, Container, Sprite, Texture } from "pixi.js";

export default class Background {
    public readonly sprite: Container;
    private readonly texture: Texture;

    constructor() {
        this.texture = Assets.get("atlas").textures["BG.png"];
        this.sprite = new Sprite(this.texture);
    }
}
