import { Features } from "@/Features";
import { IgtFeature, NoRequirement, SaveData } from "incremental-game-template";
import { Statistics } from "../statistics/Statistics";
import { Upgrade } from "./Upgrade";
import { NumberStatisticRequirement } from "../requirements/NumberStatisticRequirement";
import { Resources } from "../resources/Resources";
import { UpgradeRequirement } from "../requirements/UpgradeRequirement";

interface UpgradesSaveData extends SaveData {
    [key: string]: boolean;
}

export class Upgrades extends IgtFeature {

    private _statistics!: Statistics;
    private _resources!: Resources;

    public list: Record<string, Upgrade>;

    constructor() {
        super("upgrades");
        this.list = {};
    }

    initialize(features: Features) {
        this._statistics = features.statistics;
        this._resources = features.resources;

        this.list = {
            "win": new Upgrade("win", "Win the Game", "It's only one point, should be easy!", "", new NoRequirement(), { "Points": 1}),
            "points1": new Upgrade("points1", "Actually gain points", "One step closer to winning", "lol I never told you how much you would gain", new NumberStatisticRequirement('localGain-Annoyance', 10), { "Annoyance": 20 }),
            "button1": new Upgrade("button1", "Button Upgrade 1", "This button is a bit dull no?", "Now you can click in style!", new UpgradeRequirement("points1"), { "Points": 2e-322}),
            "button2": new Upgrade("button2", "Button Upgrade B", "Are you tired of clicking?", "Now you can hold down the mouse button!", new UpgradeRequirement("button1"), { "Points": 5e-322}),
            "button3": new Upgrade("button3", "Button Upgrade III", "That button is looking lonely...", "Here's a friend!", new UpgradeRequirement("button2"), { "Points": 1e-321}),
            "points2": new Upgrade("points2", "Ok this will help you get more points", "Getting closer to exponential growth", "Two steps forward, one step back", new UpgradeRequirement('button2'), { "Annoyance": 200 }),
            "button4": new Upgrade("button4", "Button Upgrade four", "Do you have any phobias?", "Well, buttons have musophobia", new UpgradeRequirement("button3"), { "Points": 2e-321}),

            // hover only
            // three buttons
            // buttons scared
            // buttons DVD movement
            // button decay/respawn
            // ui upgrade - vague descriptions
            // ticker
            // IAP
            // loot boxes
        }
    }

    purchaseUpgrade(upgradeId: string) {
        const upgrade: Upgrade = this.list[upgradeId];
        if (this.canPurchaseUpgrade(upgradeId)) {
            upgrade.purchased = true;
            this._resources.loseResources(upgrade.cost);
        }
    }

    canPurchaseUpgrade(upgradeId: string) {
        const upgrade: Upgrade = this.list[upgradeId];
        return !upgrade.purchased && this._resources.canAfford(this.list[upgradeId].cost);
    }

    hasUpgrade(upgradeId: string) {
        return this.list[upgradeId].purchased;
    }

    getUpgrade(upgradeId: string) {
        return this.list[upgradeId];
    }

    load(data: UpgradesSaveData): void {
        if (data == null)
        {
            return;
        }
        Object.values(this.list).forEach((upgrade) => {
            if (data[upgrade.id]) {
                upgrade.purchased = data[upgrade.id];
            }
        });
    }
    save(): UpgradesSaveData {
        const data: UpgradesSaveData = {};
        Object.values(this.list).forEach((upgrade) => {
            data[upgrade.id] = upgrade.purchased;
        });

        return data;
    }
    
}
