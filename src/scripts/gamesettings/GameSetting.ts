import { Requirement } from "incremental-game-template";

export abstract class GameSetting {

    abstract componentName: string;

    public value: unknown;

    constructor(
        public name: string,
        public description: string,
        public requirement: Requirement,
    ) { }

    get visible(): boolean {
        return this.requirement.isCompleted;
    }

}