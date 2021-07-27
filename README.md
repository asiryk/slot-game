# Slot machine game
A simple slot machine game with three reels.

![Slots](./examples/Screenshot_20200915-112117.jpg "Slots")

### [Live Demo](https://pixi-slot-game.herokuapp.com/ "Slot game")

---

#### What you need to run this code
1. Node (16.x)
2. npm (7.x)

#### How to run this code
1. Clone this repository
2. Open command line in the cloned folder,
   - To install dependencies, run ```npm install```
   - To run the application for development, run ```npm serve```
3. Open [localhost:4200](http://localhost:4200/) in the browser
4. To run the application on the local network
   - Run ```npm serve:lan```
   - Find your computer's address on the network. In terminal, type ```ipconfig``` and look for IPv4 Address, or the one with something like **192.168.1.1**
   - In your mobile device on the same network, visit [http://192.168.1.1:4200](http://192.168.1.1:4200).
   
---

### Features
1. Winning: (3 symbols in a middle horizontal row)
   - 3 Same symbols
   - 2 Same symbols and 1 Wild
   - 2 Wilds and 1 any symbol
   - _**Note:**_ 3 Wilds counts as a loss
