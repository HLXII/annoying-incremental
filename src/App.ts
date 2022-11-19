import GameController from "./scripts/GameController";
import { Game } from "./Game";
import { Settings } from "./scripts/Settings";

export class App {
    static inProduction: boolean = (process.env.NODE_ENV === "production");

    static game: Game;

    static start(): void {

        this.game = this.getDefaultGame();
        this.game.initialize();
        this.game.load();
        this.game.start();
    }

    public static getDefaultGame(): Game {
        return new Game(
            {
                settings: new Settings(),
                controller: new GameController(),
            }
        );
    }
}
