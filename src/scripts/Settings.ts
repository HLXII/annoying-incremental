import { IgtSettings, Setting } from "incremental-game-template";

export class Settings extends IgtSettings {
    list: Setting[];
    
    constructor() {
        super("settings");
        this.list = [];

    }

    initialize() {
        return;
    }

}
