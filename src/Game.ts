import {GameState, IgtGame} from "incremental-game-template";
import {Features} from "@/Features";

export class Game extends IgtGame {
    protected readonly SAVE_KEY: string = 'annoying-incremental';
    protected readonly TICK_DURATION: number = 0.05;
    features: Features;

    constructor(features: Features) {
        super();
        this.features = features;
    }

    /**
     * Update all features
     * Overriding base implementation to ensure timestep isn't
     * too high.
     */
    public update(): void {
        const now = new Date().getTime() / 1000;
        const timeDifference = Math.max(0, now - this._lastUpdate);

        if (this.state != GameState.Playing) {
            return;
        }

        const delta = timeDifference * this.gameSpeed;
        const deltaTicks = Math.max(1, Math.floor(delta / this.TICK_DURATION));
        const tickDelta = delta / deltaTicks;

        for (let i = 0; i < deltaTicks; i++) {
            for (const feature of this.featureList) {
                feature.update(tickDelta)
            }
        }

        this._lastUpdate = now;
        this._nextSave -= delta;
        if (this._nextSave <= 0) {
            this.save();
            this._nextSave = this.SAVE_INTERVAL;
        }
    }
}
