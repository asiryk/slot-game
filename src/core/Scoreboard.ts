import * as PIXI from 'pixi.js';

export default class Scoreboard {
    public container: PIXI.Container;
    public outOfMoney = false;
    private moneyText: PIXI.Text;
    private money: number = 100;
    private bet: number = 5;

    constructor(app: PIXI.Application) {
        this.container = new PIXI.Container();
        this.generateScoreboard(app.screen.width, app.screen.height);
    }

    decrement() {
        if (!this.outOfMoney) {
            this.money -= this.bet;
            this.moneyText.text = `money: $${this.money}`;
        }
        if (this.money - this.bet < 0) {
            this.outOfMoney = true;
        }
    }

    increment() {
        this.money += this.bet * 2;
        this.moneyText.text = `money: $${this.money}`;
    }

    private generateScoreboard(appWidth: number, appHeight: number) {
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 'yellow',
        });

        this.moneyText = new PIXI.Text(`money: $${this.money}`, style);
        const betText = new PIXI.Text(`bet: $${this.bet}`, style);
        betText.x = this.moneyText.x = 10;
        this.moneyText.y = 5;
        betText.y = this.moneyText.height + 10;

        const rect = new PIXI.Graphics();
        rect.beginFill(0x02474E, 0.8);
        rect.drawRect(0, 0, 160, this.moneyText.height + betText.height + 20);
        rect.endFill();

        this.container.x = appWidth - rect.width - 7;
        this.container.y = appHeight / 2 + 70;
        this.container.addChild(rect, this.moneyText, betText);
    }
}
