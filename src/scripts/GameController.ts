import { Features } from "@/Features";
import { SaveData, IgtFeature, HotKeys, KeyBind, KeyEventType } from "incremental-game-template";
import { Settings } from "./Settings";

export interface GameControllerSaveData extends SaveData {
}

export default class GameController extends IgtFeature {

    /**Internal reference to Features */
    private settings!: Settings;

    //#region Modifier Key booleans
    public ctrlKey = false;
    public shiftKey = false;
    public altKey = false;
    //#endregion

    constructor() {
        super('controller');
    }

    initialize(features: Features): void {
        this.settings = features.settings;

        // Adding modifier key bindings
        HotKeys.addKeyBind(new KeyBind('ctrl', 'Ctrl Modifier Down', () => { this.ctrlKey = true; }, undefined, KeyEventType.KeyDown));
        HotKeys.addKeyBind(new KeyBind('ctrl', 'Ctrl Modifier Up', () => { this.ctrlKey = false; }, undefined, KeyEventType.KeyUp));
        HotKeys.addKeyBind(new KeyBind('shift', 'Shift Modifier Down', () => { this.shiftKey = true; }, undefined, KeyEventType.KeyDown));
        HotKeys.addKeyBind(new KeyBind('shift', 'Shift Modifier Up', () => { this.shiftKey = false; }, undefined, KeyEventType.KeyUp));
        HotKeys.addKeyBind(new KeyBind('alt', 'Alt Modifier Down', () => { this.altKey = true; }, undefined, KeyEventType.KeyDown));
        HotKeys.addKeyBind(new KeyBind('alt', 'Alt Modifier Up', () => { this.altKey = false; }, undefined, KeyEventType.KeyUp));
    }
    canAccess(): boolean {
        return true;
    }

    load(data: GameControllerSaveData): void {
        return;
    }
    save(): GameControllerSaveData {
        return {
        };
    }
}