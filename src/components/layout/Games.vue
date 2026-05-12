<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import Card from '@/components/ui/Card.vue'
import LoadingState from '@/components/ui/LoadingState.vue'
import PageContainer from '@/components/ui/PageContainer.vue'

const props = defineProps({
    games: {
        type: Array,
        required: true,
    },
    loading: {
        type: Boolean,
        required: true,
    },
})

const games = computed(() => {
    return props.games
        .slice()
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
        .slice(0, 12)
})
</script>

<template>
    <PageContainer class="py-10 md:py-14">
        <div class="mb-8 md:mb-10">
            <p class="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-primary">Spotlight</p>
            <h2 class="mt-2 text-xl font-bold tracking-tight text-secondary sm:text-2xl">
                New releases
                <span
                    v-if="!loading"
                    class="font-semibold text-slate-500"
                >&nbsp;({{ games.length }})</span>
            </h2>
            <p class="mt-3 w-full text-sm leading-relaxed text-slate-600 md:text-[0.9375rem]">
                A tight dozen of the freshest free-to-play titles on the catalogue, sorted by ship date beneath
                the hero. Dive into
                <RouterLink
                    class="font-semibold text-primary underline-offset-4 hover:text-secondary hover:underline"
                    to="/games"
                >
                    Browse games
                </RouterLink>
                for the entire library, skim
                <RouterLink
                    class="font-semibold text-primary underline-offset-4 hover:text-secondary hover:underline"
                    to="/platforms"
                >
                    Platforms
                </RouterLink>
                or
                <RouterLink
                    class="font-semibold text-primary underline-offset-4 hover:text-secondary hover:underline"
                    to="/categories"
                >
                    Categories
                </RouterLink>
                when you want presets, then open any card below for storefront details.
            </p>
        </div>

        <LoadingState v-if="loading" />

        <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <template v-if="games.length > 0">
                <Card v-for="game in games" :key="game.id" :game="game" />
            </template>
            <p
                v-else
                class="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white/60 px-4 py-12 text-center text-sm font-medium text-slate-500"
            >
                No games found.
            </p>
        </div>
    </PageContainer>
</template>
