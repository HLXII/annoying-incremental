import { Requirement } from "incremental-game-template";

export class Upgrade {

    public purchased: boolean;

    constructor(
        public id: string,
        public name: string,
        public description: string,
        public afterDescription: string,
        public visibleReq: Requirement,
        public cost: {[resource: string]: number}
    ) { 
        this.purchased = false;
    }

    get visible(): boolean {
        return this.visibleReq.isCompleted;
    }

}