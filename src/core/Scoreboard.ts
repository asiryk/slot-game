import { Application, Container, Graphics, Text, TextStyle } from "pixi.js";

export default class Scoreboard {
    public container: Container;
    public outOfMoney = false;
    private winAmountText: Text;
    private moneyText: Text;
    private winAmount: number = 0;
    private money: number = 100;
    private bet: number = 5;

    constructor(app: Application) {
        this.container = new Container();
        this.generate(app.screen.width, app.screen.height);
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
        this.winAmount += this.bet;
        this.winAmountText.text = `win: $${this.winAmount}`;
        if (this.outOfMoney) this.outOfMoney = false;
    }

    private generate(appWidth: number, appHeight: number) {
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 'yellow',
        });

        this.moneyText = new Text(`money: $${this.money}`, style);
        this.moneyText.y = 5;

        const betText = new Text(`bet: $${this.bet}`, style);
        betText.y = this.moneyText.height + 10;

        this.winAmountText = new Text(`win: $${this.winAmount}`, style);
        this.winAmountText.y = betText.y + betText.height + 5;

        betText.x = this.moneyText.x = this.winAmountText.x = 10;

        const rect = new Graphics();
        rect.beginFill(0x02474E, 0.8);
        const rectHeight = this.moneyText.height + betText.height + this.winAmountText.height + 25;
        rect.drawRect(0, 0, 160, rectHeight);
        rect.endFill();

        this.container.x = appWidth - rect.width - 7;
        this.container.y = appHeight / 2 + 70;
        this.container.addChild(rect, this.moneyText, betText, this.winAmountText);
    }
}
