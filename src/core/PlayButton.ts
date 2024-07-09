import { Application, Sprite, Texture } from "pixi.js";

export default class PlayButton {
    public readonly sprite: Sprite;
    private readonly onClick: () => void;
    private readonly activeTexture: Texture;
    private readonly disabledTexture: Texture;

    constructor(app: Application, onClick: () => void) {
        this.onClick = onClick;
        this.activeTexture = app.loader.resources.atlas.textures!['BTN_Spin.png'];
        this.disabledTexture = app.loader.resources.atlas.textures!['BTN_Spin_d.png'];
        this.sprite = new Sprite(this.activeTexture);
        this.init(app.screen.width, app.screen.height);
    }

    setEnabled() {
        this.sprite.texture = this.activeTexture;
        this.sprite.interactive = true;
    }

    setDisabled() {
        this.sprite.texture = this.disabledTexture;
        this.sprite.interactive = false;
    }

    private init(appWidth: number, appHeight: number) {
        this.sprite.x = appWidth - (this.sprite.width + 37.25);
        this.sprite.y = (appHeight - this.sprite.height) / 2;
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;
        this.sprite.addListener('pointerdown', this.onClick);
    }
}
