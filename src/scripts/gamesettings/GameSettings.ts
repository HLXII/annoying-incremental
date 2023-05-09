import { Features } from "@/Features";
import { IgtFeature, SaveData } from "incremental-game-template";
import { Statistics } from "../statistics/Statistics";
import { GameSetting } from "./GameSetting";
import { ToggleGameSetting } from "./ToggleGameSetting";
import { UpgradeRequirement } from "../requirements/UpgradeRequirement";
import { NumberGameSetting } from "./NumberGameSetting";

interface GameSettingsSaveData extends SaveData {
    [key: string]: unknown;
}

export class GameSettings extends IgtFeature {

    private _statistics!: Statistics;

    public list!: Record<string, GameSetting>;

    constructor() {
        super("gamesettings");
        this.list = {};
    }

    initialize(features: Features) {
        this._statistics = features.statistics;

        this.list = {
            "Rainbow": new ToggleGameSetting("Rainbow", "Makes buttons more stylish. +50% Annoyance", new UpgradeRequirement('button1')),
            "Hold Down": new ToggleGameSetting("Hold Down", "Hold down on buttons to auto-click. -75% Annoyance", new UpgradeRequirement('button2')),
            "Button Count": new NumberGameSetting("Button Count", "Number of buttons", new UpgradeRequirement('button3'), 1, 1, 2),
            "Button Point Plus": new ToggleGameSetting("Button Point Plus", "Point gain fluctuates between -200% to 300%", new UpgradeRequirement('points2')),
            "Musophobia": new ToggleGameSetting("Musophobia", "Makes buttons scared of mice", new UpgradeRequirement("button4")),
        };
    }

    getGameSetting(gameSettingName: string): GameSetting {
        return this.list[gameSettingName];
    }

    getToggleSettingValue(gameSettingName: string): boolean {
        const toggleSetting = this.list[gameSettingName] as ToggleGameSetting;
        return toggleSetting && toggleSetting.visible && toggleSetting.value;
    }

    getNumberSettingValue(gameSettingName: string): number {
        const numberSetting = this.list[gameSettingName] as NumberGameSetting;
        if (numberSetting == null) {
            return 0;
        }
        if (!numberSetting.visible) {
            return numberSetting.defaultValue;
        }
        return numberSetting.value;
    }

    addSubscription(gameSettingName: string, subscriber: (name: string, newValue: unknown) => void) {
        this.getGameSetting(gameSettingName).addSubscription(subscriber);
    }

    load(data: GameSettingsSaveData): void {
        if (data == null)
        {
            return;
        }
        Object.values(this.list).forEach((gameSetting) => {
            if (data[gameSetting.name]) {
                gameSetting.value = data[gameSetting.name];
            }
        });
    }
    save(): GameSettingsSaveData {
        const data: GameSettingsSaveData = {};
        Object.values(this.list).forEach((gameSetting) => {
            data[gameSetting.name] = gameSetting.value;
        });

        return data;
    }
    
}
