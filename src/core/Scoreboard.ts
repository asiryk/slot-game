import * as PIXI from 'pixi.js';

export default class Scoreboard {
    container: PIXI.Container;
    moneyAmount: PIXI.Text;
    appWidth: number;
    appHeight: number;
    money: number = 100;
    bet: number = 5;
    public outOfMoney = false;

    constructor(app: PIXI.Application) {
        this.container = new PIXI.Container();
        this.appWidth = app.screen.width;
        this.appHeight = app.screen.height;
        this.generateScoreboard();
    }

    generateScoreboard() {
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 'yellow',
        });

        this.moneyAmount = new PIXI.Text(`money: $${this.money}`, style);
        const betAmount = new PIXI.Text(`bet: $${this.bet}`, style);
        betAmount.x = this.moneyAmount.x = 10;
        this.moneyAmount.y = 5;
        betAmount.y = this.moneyAmount.height + 10;

        const rect = new PIXI.Graphics();
        rect.beginFill(0x02474E, 0.8);
        rect.drawRect(0, 0, 160, this.moneyAmount.height + betAmount.height + 20);
        rect.endFill();

        this.container.x = this.appWidth - rect.width - 7;
        this.container.y = this.appHeight / 2 + 70;
        this.container.addChild(rect, this.moneyAmount, betAmount)
    }

    decrement() {
        if (!this.outOfMoney) {
            this.money -= this.bet;
            this.moneyAmount.text = `money: $${this.money}`;
        }
        if (this.money - this.bet < 0) {
            this.outOfMoney = true;
        }
    }

    increment() {
        this.money += this.bet * 2;
        this.moneyAmount.text = `money: $${this.money}`;
    }
}
