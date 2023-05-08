<template>
    <div class="upgrades m-2">
        <div class="d-flex flex-wrap justify-content-center">
            <button class="upgrade m-1" v-for="upgrade in visibleUpgrades" :key="upgrade.id" 
            :disabled="!canPurchaseUpgrade(upgrade.id)" 
            @click="purchaseUpgrade(upgrade.id)" 
            :title="!upgrade.purchased ? upgrade.description : upgrade.afterDescription">
                {{upgrade.name}}
                <br>
                <div v-if="!upgrade.purchased">
                    <div v-for="cost in Object.entries(upgrade.cost)" :key="cost[0]">
                        {{cost[0]}}: {{cost[1]}}
                    </div>
                </div>
                <div v-else>
                    Purchased
                </div>
            </button>
        </div>
    </div>
</template>

<script>
import { Upgrades } from '@/scripts/upgrades/Upgrades';

export default {
    name: "upgrades",
    props: {
        upgrades: {
            type: Upgrades,
            required: true,
        }
    },
    computed: {
        visibleUpgrades() {
            return Object.values(this.upgrades.list).filter((upgrade) => upgrade.visible);
        }
    },
    methods: {
        canPurchaseUpgrade(upgradeId) {
            return this.upgrades.canPurchaseUpgrade(upgradeId);
        },
        purchaseUpgrade(upgradeId) {
            this.upgrades.purchaseUpgrade(upgradeId);
        }
    },
}
</script>

<style>
</style>
