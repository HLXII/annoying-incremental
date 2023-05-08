<template>
    <div class="resources" style="min-width:200px;">
        <div class="resource"  v-for="resource in visibleResources" :key="resource.name">
            {{resource.name}}: {{resource.amount}}
        </div>
    </div>
</template>

<script>
import { Resources } from '@/scripts/resources/Resources'

export default {
    name: "resources",
    props: {
        resources: {
            type: Resources,
            required: true,
        }
    },
    computed: {
        visibleResources() {
            return Object.values(this.resources.list).filter((resource) => resource.visible);
        }
    },
    methods: {
    },
}
</script>

<style>
</style>
