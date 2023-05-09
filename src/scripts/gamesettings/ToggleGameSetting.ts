import { GameSetting } from "./GameSetting";

export class ToggleGameSetting extends GameSetting {
    componentName: string = 'toggle-game-setting';

    protected _value: boolean = false;
    public get value(): boolean {
        return this._value;
    }
    public set value(newValue: boolean) {
        if (this._value != newValue) {
            this._value = newValue;
            this._subscriptionCallbacks.forEach((subscriber) => {
                subscriber(this.name, this._value);
            });
        } 
    }
}