import { Application, Container, Graphics, TextStyle, Text } from "pixi.js";

export default class VictoryScreen {
    public container: Container;
    private overlay: Graphics;

    constructor(app: Application) {
        this.container = new Container();
        this.generate(app.screen.width, app.screen.height);
    }

    show() {
        this.container.visible = true;
        const id = window.setTimeout(this.hide.bind(this), 3000);
        const handler = () => {
            window.clearTimeout(id);
            this.hide();
        };
        this.overlay.addListener("pointerdown", handler.bind(this));
    }

    hide() {
        this.container.visible = false;
    }

    private generate(appWidth: number, appHeight: number) {
        this.container.visible = false;

        this.overlay = new Graphics()
            .rect(0, 0, appWidth, appHeight)
            .fill({ color: 0xffffff, alpha: 0.001 });

        this.overlay.interactive = true;
        this.overlay.eventMode = "static";
        this.overlay.cursor = "default";

        const rect = new Graphics()
            .rect(0, 0, 717.5, 400)
            .fill({ color: 0x02474E, alpha: 0.8 });
        rect.x = 70;
        rect.y = (appHeight - rect.height) / 2;

        const style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 96,
            fill: "yellow",
        });

        const text = new Text({ text: "YOU WON!", style });
        text.x = 70 + (rect.width - text.width) / 2;
        text.y = (appHeight - text.height) / 2;

        this.container.addChild(rect, text, this.overlay);
    }
}
