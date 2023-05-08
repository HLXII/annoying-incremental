import GameController from "./scripts/GameController";
import { Game } from "./Game";
import { Settings } from "./scripts/Settings";
import { Resources } from "./scripts/resources/Resources";
import { Statistics } from "./scripts/statistics/Statistics";
import { Upgrades } from "./scripts/upgrades/Upgrades";
import ButtonHandler from "./scripts/button/ButtonHandler";
import { GameSettings } from "./scripts/gamesettings/GameSettings";

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
                resources: new Resources(),
                upgrades: new Upgrades(),
                buttonHandler: new ButtonHandler(),
                gameSettings: new GameSettings(),
                statistics: new Statistics(),
            }
        );
    }
}
