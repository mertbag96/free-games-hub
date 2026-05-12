<script setup>
import Card from '@/components/ui/Card.vue'
import LoadingState from '@/components/ui/LoadingState.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import PageContainer from '@/components/ui/PageContainer.vue'
import FormField from '@/components/ui/FormField.vue'
import FormSelect from '@/components/ui/FormSelect.vue'
import PlatformChipGroup from '@/components/ui/PlatformChipGroup.vue'
import { reactive, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { GAME_CATEGORIES, GAME_PLATFORMS } from '@/data/gameFilters.js'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const tags = GAME_CATEGORIES

const categorySlugs = new Set(GAME_CATEGORIES.map((c) => c.value))
const platformSlugs = new Set(GAME_PLATFORMS.map((p) => p.value))

const route = useRoute()
const router = useRouter()

const state = reactive({
    games: [],
    loading: true,
    search: '',
    tag: '',
    platform: '',
})

const hasActiveToolbarFilters = computed(
    () => Boolean(state.search.trim()) || Boolean(state.tag) || Boolean(state.platform),
)

const clearToolbarFilters = () => {
    state.search = ''
    state.tag = ''
    state.platform = ''
    router.replace({ path: '/games', query: {} }).catch(() => {})
}

const normalizeQueryValue = (param) => {
    if (param == null || param === '') return ''
    const raw = Array.isArray(param) ? param[0] : param
    return typeof raw === 'string' ? raw : ''
}

const applyFiltersFromRoute = () => {
    const cat = normalizeQueryValue(route.query.category)
    if (!cat || !categorySlugs.has(cat)) {
        state.tag = ''
    } else {
        state.tag = cat
    }

    const plat = normalizeQueryValue(route.query.platform)
    if (!plat || !platformSlugs.has(plat)) {
        state.platform = ''
    } else {
        state.platform = plat
    }
}

const fetchGames = async () => {
    try {
        let url = '/api/games?'

        if (state.tag) {
            url += `category=${state.tag}&`
        }

        if (state.platform) {
            url += `platform=${state.platform}&`
        }

        const response = await fetch(url)
        state.games = await response.json()
    } catch (error) {
        console.error('Error fetching games: ', error)
    } finally {
        setTimeout(() => {
            state.loading = false
        }, 500)
    }
}

const games = computed(() => {
    return state.games
        .filter((game) => game.title.toLowerCase().includes(state.search.toLowerCase()))
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
})

onMounted(() => {
    applyFiltersFromRoute()
    fetchGames()
})

watch(() => route.fullPath, () => {
    applyFiltersFromRoute()
})

watch([() => state.tag, () => state.platform], () => {
    fetchGames()
})
</script>

<template>
    <PageContainer class="py-8 md:py-11">
        <SectionHeading title="All Games" :suffix="games.length">
            <template #actions>
                <button
                    v-if="hasActiveToolbarFilters"
                    type="button"
                    class="rounded-xl border border-slate-200/90 bg-white/95 px-3 py-2 text-xs font-semibold tracking-wide text-secondary shadow-sm outline-none ring-primary/30 transition-colors hover:border-primary/45 hover:bg-slate-50 focus-visible:ring-2 md:px-4 md:text-sm"
                    @click="clearToolbarFilters"
                >
                    Clear filters
                </button>
            </template>
        </SectionHeading>

        <section
            class="relative mb-11 overflow-hidden rounded-[1.6rem] border border-slate-200/92 bg-white/93 p-6 shadow-[0_26px_50px_-32px_rgb(0_53_86/0.28)] ring-1 ring-white/90 backdrop-blur-md sm:p-8"
            aria-label="Browse filters"
        >
            <div
                class="pointer-events-none absolute -right-[15%] -top-[40%] h-72 w-72 rounded-full bg-primary/15 blur-[100px]"
                aria-hidden="true"
            />

            <div class="relative w-full space-y-4 sm:space-y-5">
                <FormField
                    id="game-search"
                    v-model="state.search"
                    name="search"
                    variant="filter"
                    label="Search the catalogue"
                    type="search"
                    placeholder="Type a game title..."
                    autocomplete="off"
                >
                    <template #prefix>
                        <MagnifyingGlassIcon class="size-[1.3rem]" />
                    </template>
                </FormField>

                <PlatformChipGroup v-model="state.platform" label-id="games-platform-heading" />

                <FormSelect
                    id="game-category-filter"
                    v-model="state.tag"
                    name="tag"
                    variant="filter"
                    label="Category"
                    placeholder="All categories"
                    :options="tags"
                    class="w-full"
                />
            </div>
        </section>

        <LoadingState v-if="state.loading" />

        <div v-else class="grid grid-cols-1 gap-5 pb-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card v-for="game in games" :key="game.id" :game="game" />
            <p
                v-if="games.length === 0"
                class="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white/65 px-4 py-14 text-center text-sm font-semibold leading-relaxed text-slate-500"
            >
                No titles match your filters yet. Adjust the catalogue pickers above or broaden your search phrase.
            </p>
        </div>
    </PageContainer>
</template>
