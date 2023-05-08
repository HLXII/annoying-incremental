<template>
    <div class="number-game-setting d-flex flex-column" style="position:relative">
        <div>        
            {{gameSetting.name}} - {{gameSetting.description}}
        </div>
        <div class="slidecontainer">
            <input type="range" :min="gameSetting.minValue" :max="gameSetting.maxValue" :value="gameSetting.value" class="slider" @change="change">
        </div>
        <div class="d-flex justify-content-between">
            <span>Min: {{gameSetting.minValue}}</span>
            <span>Value: {{gameSetting.value}}</span>
            <span>Max: {{gameSetting.maxValue}}</span>
        </div>
    </div>
</template>

<script>
import { NumberGameSetting } from '@/scripts/gamesettings/NumberGameSetting';
import { GameSettings } from '@/scripts/gamesettings/GameSettings';

export default {
    name: "number-game-setting",
    props: {
        gameSettings: {
            type: GameSettings,
            required: true,
        },
        gameSetting: {
            type: NumberGameSetting,
            required: true,
        }
    },
    computed: {
    },
    methods: {
        change(event) {
            this.gameSettings.getGameSetting(this.gameSetting.name).value = Number(event.target.value);
        }
    },
}
</script>

<style scoped>
.slidecontainer {
    position: relative;
  width: 100%; /* Width of the outside container */
}

/* The slider itself */
.slider {
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 25px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: #04AA6D; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: #04AA6D; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

</style>
