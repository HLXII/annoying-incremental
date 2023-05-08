<template>
    <div class="game-settings">
        <div class="d-flex flex-column">
            <div class="game-setting m-1" v-for="gameSetting in visibleSettings" :key="gameSetting.name"> 
              <component v-bind:is="gameSetting.componentName" :gameSetting="gameSetting" :gameSettings="gameSettings"></component>
            </div>
        </div>
    </div>
</template>

<script>
import { GameSettings } from '@/scripts/gamesettings/GameSettings'
import toggleGameSetting from './toggle-game-setting.vue';
import numberGameSetting from './number-game-setting.vue';

export default {
  components: { toggleGameSetting, numberGameSetting },
    name: "game-settings",
    props: {
        gameSettings: {
            type: GameSettings,
            required: true,
        }
    },
    computed: {
        visibleSettings() {
            return Object.values(this.gameSettings.list).filter((gameSetting) => gameSetting.visible);
        }
    },
    methods: {

    },
}
</script>

<style>
</style>
