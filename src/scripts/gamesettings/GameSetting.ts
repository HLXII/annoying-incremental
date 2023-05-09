import { Requirement } from "incremental-game-template";

export abstract class GameSetting {

    abstract componentName: string;

    protected _value: unknown;

    public get value(): unknown {
        return this._value;
    }

    public set value(newValue: unknown) {
        if (this._value != newValue) {
            this._value = newValue;
            this._subscriptionCallbacks.forEach((subscriber) => {
                subscriber(this.name, this._value);
            });
        } 
    }

    protected _subscriptionCallbacks: ((name: string, newValue: unknown) => void)[]

    constructor(
        public name: string,
        public description: string,
        public requirement: Requirement,
    ) { 
        this._subscriptionCallbacks = [];
    }

    get visible(): boolean {
        return this.requirement.isCompleted;
    }

    public addSubscription(subscriber: (name: string, newValue: unknown) => void) {
        this._subscriptionCallbacks.push(subscriber);
    }

}