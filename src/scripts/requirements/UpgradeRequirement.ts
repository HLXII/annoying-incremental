import { App } from "@/App";
import { Upgrade } from "../upgrades/Upgrade";
import { Requirement } from "incremental-game-template";

export class UpgradeRequirement extends Requirement {

    private _upgrade: Upgrade | undefined;

    constructor(public upgradeId: string) {
        super()
    }

    get hint(): string {
        return ""
    }

    get targetValue(): number {
        return 1;
    }

    get actualValue(): number {
        if (this._upgrade == undefined) {
            this._upgrade = App.game.features.upgrades.getUpgrade(this.upgradeId) as Upgrade;
        }

        return this._upgrade.purchased ? 1 : 0;
    }
}
