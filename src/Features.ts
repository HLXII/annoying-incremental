import {IgtFeatures} from "incremental-game-template";

import GameController from "@/scripts/GameController";
import { Settings } from "@/scripts/Settings";

export interface Features extends IgtFeatures {
    settings: Settings;
    controller: GameController;
}
