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

    value: number;
}