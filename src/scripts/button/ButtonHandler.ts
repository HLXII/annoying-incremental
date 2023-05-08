import { Features } from "@/Features";
import { SaveData, IgtFeature } from "incremental-game-template";
import { Resources } from "../resources/Resources";
import { Upgrades } from "../upgrades/Upgrades";
import { GameSettings } from "../gamesettings/GameSettings";
import { ToggleGameSetting } from "../gamesettings/ToggleGameSetting";

export interface ButtonHandlerSaveData extends SaveData {
}

export default class ButtonHandler extends IgtFeature {

    private _resources!: Resources;
    private _upgrades!: Upgrades;
    private _gameSettings!: GameSettings;

    private holdTimer: number = 0;
    private holdTimerActive: boolean = false;

    constructor() {
        super('buttonHandler');
    }

    initialize(features: Features): void {
        this._resources = features.resources;
        this._upgrades = features.upgrades;
        this._gameSettings = features.gameSettings;
    }

    update(delta: number): void {
        if (this.holdTimerActive) {
            this.holdTimer += delta;
        } else {
            this.holdTimer = 0;
        }
        if (this.holdTimer > 0.2) {
            this.handleClick();
            this.holdTimer -= 0.2;
        }
    }

    handleClick(): void {
        this._resources.gainResource("Annoyance", this.annoyanceGain);
        this._resources.gainResource("Points", this.pointsGain);
    }

    handleMouseDown(): void {
        console.log('Mouse down');
        this.holdTimerActive = true;
    }

    handleMouseUp(): void {
        console.log('Mouse up');
        this.holdTimerActive = false;
    }

    handleMouseEnter(): void {
        console.log('Mouse enter');
    }

    handleMouseLeave(): void {
        console.log('Mouse leave');
        this.holdTimerActive = false;
    }

    get buttonClass(): string {
        const classes: string[] = [];

        if (this._gameSettings.getToggleSettingValue('Rainbow')) {
            classes.push('rainbow');
        }

        return classes.join(' ');
    }

    private get annoyanceGain(): number {
        // TODO: Add multipliers
        return 1;
    }

    private get pointsGain(): number {
        if (this._upgrades.hasUpgrade("points1")) {
            return Number.MIN_VALUE;
        }
    
        return 0;
    }

    canAccess(): boolean {
        return true;
    }

    load(data: ButtonHandlerSaveData): void {
        return;
    }
    save(): ButtonHandlerSaveData {
        return {
        };
    }
}