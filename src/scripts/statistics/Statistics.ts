import { Features } from "@/Features";
import { IgtStatistics, NumberStatistic } from "incremental-game-template";

export class Statistics extends IgtStatistics
{
    initialize(features: Features): void {
        Object.values(features.resources.list).forEach((resource) => {
            this.list[resource.globalGainId] = new NumberStatistic(resource.globalGainId, `Global amount of ${resource.name} gained.`, 0);
            this.list[resource.localGainId] = new NumberStatistic(resource.localGainId, `Current amount of ${resource.name} gained.`, 0);
        });
    }
}