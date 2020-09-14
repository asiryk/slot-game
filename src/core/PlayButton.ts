import * as PIXI from 'pixi.js';

export default class PlayButton {
    public readonly sprite: PIXI.Sprite;
    private readonly onClick: () => void;
    private readonly appWidth: number;
    private readonly appHeight: number;
    private readonly activeTexture: PIXI.Texture;
    private readonly disabledTexture: PIXI.Texture;

    constructor(app: PIXI.Application, onClick: () => void) {
        this.onClick = onClick;
        this.activeTexture = app.loader.resources!.atlas.textures!['BTN_Spin.png'];
        this.disabledTexture = app.loader.resources!.atlas.textures!['BTN_Spin_d.png'];
        this.appWidth = app.screen.width;
        this.appHeight = app.screen.height;
        this.sprite = new PIXI.Sprite(this.activeTexture);
        this.init();
    }

    private init() {
        this.sprite.x = this.appWidth - (this.sprite.width + 37.25);
        this.sprite.y = (this.appHeight - this.sprite.height) / 2;
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;
        this.sprite.addListener('pointerdown', this.onClick);
    }

    setDisabled() {
        this.sprite.texture = this.disabledTexture;
        this.sprite.interactive = false;
    }

    setActive() {
        this.sprite.texture = this.activeTexture;
        this.sprite.interactive = true;
    }
}
