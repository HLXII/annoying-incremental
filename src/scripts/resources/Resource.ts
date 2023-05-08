import { Requirement } from "incremental-game-template";


export class Resource {

    public amount: number;

    constructor(
        public name: string,
        public visibleReq: Requirement,
        defaultAmount: number = 0,
    ) { 
        this.amount = defaultAmount;
    }

    get globalGainId(): string {
        return `globalGain-${this.name}`;
    }
    
    get localGainId(): string {
        return `localGain-${this.name}`;
    }

    get visible(): boolean {
        return this.visibleReq.isCompleted;
    }

}