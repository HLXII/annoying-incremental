<template>
    <div class="toggle-game-setting">
        {{gameSetting.name}} - {{gameSetting.description}}
        <label class="switch">
            <input type="checkbox" :checked="gameSetting.value" @change="change">
            <span class="slider round"></span>
        </label>
    </div>
</template>

<script>
import { ToggleGameSetting } from '@/scripts/gamesettings/ToggleGameSetting';
import { GameSettings } from '@/scripts/gamesettings/GameSettings';

export default {
    name: "toggle-game-setting",
    props: {
        gameSettings: {
            type: GameSettings,
            required: true,
        },
        gameSetting: {
            type: ToggleGameSetting,
            required: true,
        }
    },
    computed: {
    },
    methods: {
        change(event) {
            this.gameSettings.getGameSetting(this.gameSetting.name).value = event.target.checked;
        }
    },
}
</script>

<style scoped>

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>
