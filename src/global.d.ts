import Game from "./core/Game";

declare global {
    interface Window {
        game: Game;
    }
}

export {};
