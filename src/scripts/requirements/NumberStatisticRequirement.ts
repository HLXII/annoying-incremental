import { App } from "@/App";
import { NumberStatistic, Requirement } from "incremental-game-template";

export class NumberStatisticRequirement extends Requirement {

    private _numberStatistic: NumberStatistic | undefined;

    constructor(public numberStatistic: string, public targetValue: number) {
        super()
    }

    get hint(): string {
        return ""
    }
    get actualValue(): number {
        if (this._numberStatistic == undefined) {
            this._numberStatistic = App.game.features.statistics.getStatistic(this.numberStatistic) as NumberStatistic;
        }

        return this._numberStatistic.value;
    }

    get isCompleted(): boolean {
        return this.actualValue >= this.targetValue;
    }
}
