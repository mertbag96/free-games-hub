<script setup>
import { reactive, onMounted } from 'vue'
import Hero from '@/components/layout/Hero.vue'
import Games from '@/components/layout/Games.vue'
import HomeCatalogStats from '@/components/layout/HomeCatalogStats.vue'

const state = reactive({
    games: [],
    loading: true,
})

onMounted(async () => {
    try {
        const response = await fetch("/api/games");
        state.games = await response.json();
    } catch (error) {
        console.error('Error fetching games: ', error);
    } finally {
        setTimeout(() => {
            state.loading = false;
        }, 500);
    }
})
</script>

<template>
    <!-- Hero -->
    <Hero />

    <!-- New releases -->
    <Games :games="state.games" :loading="state.loading" />

    <!-- Catalog overview -->
    <HomeCatalogStats :games-count="state.games.length" :loading="state.loading" />
</template>