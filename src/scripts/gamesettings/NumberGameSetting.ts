import { Requirement } from "incremental-game-template";
import { GameSetting } from "./GameSetting";

export class NumberGameSetting extends GameSetting {
    componentName: string = 'number-game-setting';

    constructor(
        public name: string,
        public description: string,
        public requirement: Requirement,
        public defaultValue: number,
        public defaultMinValue: number,
        public defaultMaxValue: number,
    ) {
        super(name, description, requirement);
        this.value = defaultValue;
    }

    get maxValue(): number {
        return this.defaultMaxValue;
    }

    get minValue(): number {
        return this.defaultMinValue;
    }

    protected _value: number = 0;
    public get value(): number {
        return this._value;
    }
    public set value(newValue: number) {
        if (this._value != newValue) {
            this._value = newValue;
            this._subscriptionCallbacks.forEach((subscriber) => {
                subscriber(this.name, this._value);
            });
        } 
    }
}