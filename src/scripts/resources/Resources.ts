import { Features } from "@/Features";
import { IgtFeature, ImpossibleRequirement, NoRequirement, SaveData } from "incremental-game-template";
import { Statistics } from "../statistics/Statistics";
import { Resource } from "./Resource";
import { NumberStatisticRequirement } from "../requirements/NumberStatisticRequirement";

interface ResourcesSaveData extends SaveData {
    [key: string]: number;
}

export class Resources extends IgtFeature {

    private _statistics!: Statistics;

    public list: Record<string, Resource>;

    constructor() {
        super("resources");
        this.list = {};
    }

    initialize(features: Features) {
        this._statistics = features.statistics;

        this.list = {
            "Points": new Resource("Points", new NoRequirement()),
            "Annoyance": new Resource("Annoyance", new NumberStatisticRequirement('globalGain-Annoyance', 10)),
            "Frustration": new Resource("Frustration", new ImpossibleRequirement()),
        }
    }

    gainResource(resourceName: string, amount: number = 1)
    {
        const resource: Resource = this.list[resourceName];
        resource.amount += amount;
        if (amount > 0) {
            this._statistics.incrementNumberStatistic(resource.globalGainId, amount);
            this._statistics.incrementNumberStatistic(resource.localGainId, amount);
        }
    }

    loseResources(cost: {[resource: string]: number}) {
        Object.entries(cost).forEach(([resourceName, value]) => {
            this.gainResource(resourceName, -value);
        });
    }

    canAfford(cost: {[resource: string]: number}): boolean {
        return Object.entries(cost).every(([resource, value]) => {
            return this.list[resource].amount >= value;
        });
    }

    load(data: ResourcesSaveData): void {
        if (data == null)
        {
            return;
        }
        Object.values(this.list).forEach((resource) => {
            if (data[resource.name]) {
                resource.amount = data[resource.name];
            }
        });
    }
    save(): ResourcesSaveData {
        const data: ResourcesSaveData = {};
        Object.values(this.list).forEach((resource) => {
            data[resource.name] = resource.amount;
        });

        return data;
    }
    
}
