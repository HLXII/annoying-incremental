import {IgtFeatures} from "incremental-game-template";

import GameController from "@/scripts/GameController";
import { Settings } from "@/scripts/Settings";
import { Resources } from "./scripts/resources/Resources";
import { Statistics } from "./scripts/statistics/Statistics";
import { Upgrades } from "./scripts/upgrades/Upgrades";
import ButtonHandler from "./scripts/button/ButtonHandler";
import { GameSettings } from "./scripts/gamesettings/GameSettings";

export interface Features extends IgtFeatures {
    settings: Settings;
    controller: GameController;
    resources: Resources;
    upgrades: Upgrades;
    buttonHandler: ButtonHandler;
    gameSettings: GameSettings;
    statistics: Statistics;
}
