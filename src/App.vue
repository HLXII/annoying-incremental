<template>
    <div class="view">
        <div class="dynamic-buttons" :class="{ invisible: showStaticButtons }" style="position: absolute;">
            <div style="position: absolute; pointer-events:none;"  v-for="(dynamicButton, i) in dynamicButtons" :key="i">
                <button class="game-button dynamic-button" style="position: relative; pointer-events: all" :style="{ 'left': dynamicButton.x + 'px', 'top': (dynamicButton.y-4) + 'px' }"
                :class="buttonClass" 
                @click="onClick"
                @mousedown="mouseDown" @mouseup="mouseUp" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
                    Click Me!
                </button>
            </div>
        </div>
        <div class="d-flex justify-content-end m-1">
            <button @click="hardReset">Hard Reset</button>
        </div>
        <div class="d-flex align-items-start justify-content-between m-1">
            <resources :resources="game.features.resources" />
            <div class="d-flex align-items-start justify-content-center" style="flex-grow:1">
                <div class="d-flex flex-column align-items-center">
                    <div class="static-buttons" :class="{ invisible: !showStaticButtons }">
                        <button v-for="i in numButtons" :key="i" class="game-button static-button m-1"
                        :class="buttonClass" 
                        @click="onClick"
                        @mousedown="mouseDown" @mouseup="mouseUp" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
                            Click Me!
                        </button>
                    </div>
                    <upgrades :upgrades="game.features.upgrades" />
                </div>
            </div>
            <game-settings :gameSettings="game.features.gameSettings" />
        </div>
    </div>
</template>

<script>
import {App} from "@/App.ts"
import Resources from './controls/resources.vue'
import Upgrades from './controls/upgrades.vue'
import GameSettings from './controls/game-settings.vue'
import { ButtonDisplayState } from './scripts/button/ButtonHandler'

export default {
    components: {
        Resources,
        Upgrades,
        GameSettings
    },
    data() {
        return {
            game: App.game,
        }
    },
    computed: {
        buttonClass() {
            return this.game.features.buttonHandler.buttonClass;
        },
        numButtons() {
            return this.game.features.gameSettings.getNumberSettingValue('Button Count');
        },
        showStaticButtons() {
            return this.game.features.buttonHandler.buttonDisplayState == ButtonDisplayState.Static;
        },
        dynamicButtons() {
            return this.game.features.buttonHandler.dynamicButtons;
        }
    },
    methods: {
        onClick() {
            this.game.features.buttonHandler.handleClick();
        },
        mouseDown() {
            this.game.features.buttonHandler.handleMouseDown();
        },
        mouseUp() {
            this.game.features.buttonHandler.handleMouseUp();
        },
        mouseEnter() {
            this.game.features.buttonHandler.handleMouseEnter();
        },
        mouseLeave() {
            this.game.features.buttonHandler.handleMouseLeave();
        },
        hardReset() {
            const retVal = confirm("Are you sure you want to hard reset? This will clear all your progress forever (super annoying)");
            if( retVal == true ) {
                localStorage.clear();
                window.location.reload();
            } else {
                return false;
            }
        }
    },
}
</script>

<style>

.view {
    height: 100%
}

.game-button {
    width: 100px;
    height: 30px;
}

.invisible {
    visibility: hidden;
}

.rainbow {
    animation: rainbow-bg 2.5s linear;
    animation-iteration-count: infinite;  
}

@keyframes rainbow-bg{
		100%,0%{
			background-color: rgb(255,0,0);
		}
		8%{
			background-color: rgb(255,127,0);
		}
		16%{
			background-color: rgb(255,255,0);
		}
		25%{
			background-color: rgb(127,255,0);
		}
		33%{
			background-color: rgb(0,255,0);
		}
		41%{
			background-color: rgb(0,255,127);
		}
		50%{
			background-color: rgb(0,255,255);
		}
		58%{
			background-color: rgb(0,127,255);
		}
		66%{
			background-color: rgb(0,0,255);
		}
		75%{
			background-color: rgb(127,0,255);
		}
		83%{
			background-color: rgb(255,0,255);
		}
		91%{
			background-color: rgb(255,0,127);
		}
}
</style>
