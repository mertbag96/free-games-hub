<script setup>
import { defineProps, computed } from 'vue'
import Card from '@/components/ui/Card.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const props = defineProps({
    games: {
        type: Array,
        required: true
    },
    loading: {
        type: Boolean,
        required: true
    }
})

const games = computed(() => {
    return props.games
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
        .slice(0, 12)
})
</script>

<template>
    <div class="max-w-[92%] min-h-page md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto py-12">
        <!-- Title -->
        <h1 class="font-bold text-l text-primary mb-4">
            New Releases ({{ games.length }})
        </h1>

        <!-- Games -->
        <div v-if="!loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <Card v-for="game in games" :key="game.id" :game="game" />
            <p v-if="games.length === 0" class="font-semibold text-slate-500 text-sm">
                No games found.
            </p>
        </div>

        <!-- Loader -->
        <div v-else class="flex flex-col items-center min-h-page pt-20">
            <PulseLoader :color="'#ef4c4f'" />
            <h1 class="text-2xl font-bold text-secondary">
                Loading
            </h1>
        </div>
    </div>
</template>
