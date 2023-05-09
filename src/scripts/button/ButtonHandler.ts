import { Features } from "@/Features";
import { SaveData, IgtFeature } from "incremental-game-template";
import { Resources } from "../resources/Resources";
import { Upgrades } from "../upgrades/Upgrades";
import { GameSettings } from "../gamesettings/GameSettings";
import DynamicButton from "./DynamicButton";

export enum ButtonDisplayState {
    Static = 0,
    Dynamic = 1,
}

export interface ButtonHandlerSaveData extends SaveData {
}

export default class ButtonHandler extends IgtFeature {

    private _resources!: Resources;
    private _upgrades!: Upgrades;
    private _gameSettings!: GameSettings;

    private holdTimer: number = 0;
    private holdTimerActive: boolean = false;

    private buttonDisplayState: ButtonDisplayState = ButtonDisplayState.Static;

    public dynamicButtons: DynamicButton[] = [];

    private _currentMousePosition: {x: number; y: number} = {x: 0, y: 0};

    constructor() {
        super('buttonHandler');
    }

    initialize(features: Features): void {
        this._resources = features.resources;
        this._upgrades = features.upgrades;
        this._gameSettings = features.gameSettings;

        this._gameSettings.addSubscription('Musophobia', () => { this.checkButtonStateUpdate() });
        this._gameSettings.addSubscription('Button Count', () => { this.updateButtonAmount() });

        this.checkButtonStateUpdate();

        window.addEventListener('mousemove', (event) => {
            this._currentMousePosition = { x: event.clientX, y: event.clientY };
        });
    }

    update(delta: number): void {
        if (this._gameSettings.getToggleSettingValue('Hold Down')) {
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

        if (this.buttonDisplayState == ButtonDisplayState.Dynamic) {
            this.updateDynamicButtons();
        }
    }

    updateDynamicButtons() {

        if (this._gameSettings.getToggleSettingValue('Musophobia')) {
            this.dynamicButtons.forEach((dynamicButton) => {
                const distance = this.distance(dynamicButton.x + 50, dynamicButton.y + 15, this._currentMousePosition.x, this._currentMousePosition.y);
                if (distance < 100) {
                    // Get normalized direction
                    const xv = (dynamicButton.x + 50 - this._currentMousePosition.x) / distance;
                    const yv = (dynamicButton.y + 15 - this._currentMousePosition.y) / distance;
                    // Move that direction
                    const newX = dynamicButton.x + xv * 5;
                    const newY = dynamicButton.y + yv * 5;
                    dynamicButton.x = newX;
                    dynamicButton.y = newY;
                }
            });
        }

        // Fix positions
        const windowMaxX = window.innerWidth - 100;
        const windowMaxY = window.innerHeight - 30;
        this.dynamicButtons.forEach((dynamicButton) => {
            if (dynamicButton.x < 0) {
                dynamicButton.x = 0;
            } else if (dynamicButton.x > windowMaxX) {
                dynamicButton.x = windowMaxX;
            }

            if (dynamicButton.y < 0) {
                dynamicButton.y = 0;
            } else if (dynamicButton.y > windowMaxY) {
                dynamicButton.y = windowMaxY;
            }
        });
    }

    private distance(x1: number, y1: number, x2: number, y2: number) {
        const x = Math.abs(x1 - x2);
        const y = Math.abs(y1 - y2);
        return Math.sqrt(x * x + y * y);
    }

    private updateButtonAmount() {
        if (this.buttonDisplayState == ButtonDisplayState.Static) {
            return;
        }

        const newButtonAmount = this._gameSettings.getNumberSettingValue('Button Count');
        const oldAmount = this.dynamicButtons.length;

        if (newButtonAmount > oldAmount) {
            // Add more buttons
            for (let i = 0;i < newButtonAmount - oldAmount;i++) {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                this.dynamicButtons.push(new DynamicButton(x, y));
            }
        } else if (newButtonAmount < oldAmount) {
            // Remove some buttons
            for (let i = 0;i < oldAmount - newButtonAmount;i++) {
                this.dynamicButtons.pop();
            }
        }
    }

    checkButtonStateUpdate() {
        const newState = this.calcButtonState();
        if (newState != this.buttonDisplayState) {
            this.updateButtonState(newState);
        }
    }

    calcButtonState() {
        if (this._gameSettings.getToggleSettingValue('Musophobia')) {
            return ButtonDisplayState.Dynamic;
        }
        return ButtonDisplayState.Static;
    }

    updateButtonState(newState: ButtonDisplayState) {
        console.log(`Updating Button Display State to ${newState.toString()}`);
        if (newState == ButtonDisplayState.Static) {
            // Switch to Static
            this.dynamicButtons = [];


        } else {
            // Switch to Dynamic

            this.dynamicButtons = [];

            // Get current positions of buttons
            const staticButtons = document.getElementsByClassName('static-button');
            if (staticButtons.length > 0) {
                for (let i = 0;i < staticButtons.length; i++) {
                    const staticButton = staticButtons[i];
                    const rect = staticButton.getBoundingClientRect();
                    const x = rect.left + window.scrollX;
                    const y = rect.top + window.scrollY;
                    this.dynamicButtons.push(new DynamicButton(x, y));
                }
            } else {
                const buttonAmount = this._gameSettings.getNumberSettingValue('Button Count');
                for (let i = 0;i < buttonAmount;i++) {
                    const x = Math.random() * window.innerWidth;
                    const y = Math.random() * window.innerHeight;
                    this.dynamicButtons.push(new DynamicButton(x, y));
                }
            }

        }

        this.buttonDisplayState = newState;
    }

    handleClick(): void {
        this._resources.gainResource("Annoyance", this.annoyanceGain);

        let pointsGain = this.pointsGain;
        if (this._gameSettings.getToggleSettingValue('Button Point Plus')) {
            pointsGain *= (5 * Math.random()) - 2;
        }
        this._resources.gainResource("Points", pointsGain);
    }

    handleMouseDown(): void {
        this.holdTimerActive = true;
    }

    handleMouseUp(): void {
        this.holdTimerActive = false;
    }

    handleMouseEnter(): void {
        return;
    }

    handleMouseLeave(): void {
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
        let baseValue = 1;

        if (this._gameSettings.getToggleSettingValue('Rainbow')) {
            baseValue *= 1.5;
        }

        if (this._gameSettings.getToggleSettingValue('Hold Down')) {
            baseValue *= .25;
        }

        if (this._gameSettings.getToggleSettingValue('Button Point Plus')) {
            baseValue *= 1.25;
        }

        if (this._gameSettings.getToggleSettingValue('Button Point Plus')) {
            baseValue *= 3;
        }

        return baseValue;
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