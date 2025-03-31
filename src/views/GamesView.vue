<script setup>
import CardLong from '@/components/ui/CardLong.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { reactive, computed, onMounted, watch } from 'vue'

const tags = [
    { label: 'MMORPG', value: 'mmorpg' },
    { label: 'Shooter', value: 'shooter' },
    { label: 'Strategy', value: 'strategy' },
    { label: 'MOBA', value: 'moba' },
    { label: 'Racing', value: 'racing' },
    { label: 'Sports', value: 'sports' },
    { label: 'Social', value: 'social' },
    { label: 'Sandbox', value: 'sandbox' },
    { label: 'Open World', value: 'open-world' },
    { label: 'Survival', value: 'survival' },
    { label: 'PvP', value: 'pvp' },
    { label: 'PvE', value: 'pve' },
    { label: 'Pixel', value: 'pixel' },
    { label: 'Voxel', value: 'voxel' },
    { label: 'Zombie', value: 'zombie' },
    { label: 'Turn-Based', value: 'turn-based' },
    { label: 'First-Person', value: 'first-person' },
    { label: 'Third-Person', value: 'third-Person' },
    { label: 'Top-Down', value: 'top-down' },
    { label: 'Tank', value: 'tank' },
    { label: 'Space', value: 'space' },
    { label: 'Sailing', value: 'sailing' },
    { label: 'Side Scroller', value: 'side-scroller' },
    { label: 'Superhero', value: 'superhero' },
    { label: 'Permadeath', value: 'permadeath' },
    { label: 'Card', value: 'card' },
    { label: 'Battle Royale', value: 'battle-royale' },
    { label: 'MMO', value: 'mmo' },
    { label: 'MMOFPS', value: 'mmofps' },
    { label: 'MMOTPS', value: 'mmotps' },
    { label: '3D', value: '3d' },
    { label: '2D', value: '2d' },
    { label: 'Anime', value: 'anime' },
    { label: 'Fantasy', value: 'fantasy' },
    { label: 'Sci-Fi', value: 'sci-fi' },
    { label: 'Fighting', value: 'fighting' },
    { label: 'Action RPG', value: 'action-rpg' },
    { label: 'Action', value: 'action' },
    { label: 'Military', value: 'military' },
    { label: 'Martial Arts', value: 'martial-arts' },
    { label: 'Flight', value: 'flight' },
    { label: 'Low Spec', value: 'low-spec' },
    { label: 'Tower Defense', value: 'tower-defense' },
    { label: 'Horror', value: 'horror' },
    { label: 'MMORTS', value: 'mmorts' }
]

const platforms = [
    {
        label: 'Windows',
        value: 'pc'
    },
    {
        label: 'Browser',
        value: 'browser'
    }
]

const state = reactive({
    games: [],
    loading: true,
    search: '',
    tag: '',
    platform: ''
})

const fetchGames = async () => {
    try {
        let url = '/api/games?';
        
        if (state.tag) {
            url += `category=${state.tag}&`;
        }

        if (state.platform) {
            url += `platform=${state.platform}&`;
        }

        const response = await fetch(url);
        state.games = await response.json();
    } catch (error) {
        console.error('Error fetching games: ', error);
    } finally {
        setTimeout(() => {
            state.loading = false;
        }, 500);
    }
}

const games = computed(() => {
    return state.games
        .filter(game => game.title.toLowerCase().includes(state.search.toLowerCase()))
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
})

onMounted(fetchGames)

watch([() => state.tag, () => state.platform], () => {
    fetchGames()
})
</script>

<template>
    <div class="max-w-[92%] min-h-page md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto py-8">
        <!-- Title -->
        <h1 class="font-bold text-l text-primary mb-4">
            All Games ({{ games.length }})
        </h1>

        <!-- Search & Filters -->
        <div class="flex justify-between items-center mb-4">
            <!-- Search -->
            <input 
                v-model="state.search"
                type="text"
                placeholder="Search game..."
                class="bg-transparent outline-0 rounded-lg py-2 px-4 border-2 border-slate-300 shadow-sm font-semibold text-sm w-[62%] placeholder-slate-500 text-slate-500"
            >

            <!-- Tag Filter -->
            <select 
                v-model="state.tag"
                name="tag"
                id="tag"
                class="bg-transparent outline-0 rounded-lg py-2 px-4 border-2 border-slate-300 shadow-sm font-semibold text-sm w-[18%] text-slate-500"
            >
                <option value="">Filter by tag</option>
                <option v-for="tag in tags" :key="tag.value" :value="tag.value">
                    {{ tag.label }}
                </option>
            </select>

            <!-- Platform Filter -->
            <select 
                v-model="state.platform"
                name="platform" 
                id="platform"
                class="bg-transparent outline-0 rounded-lg py-2 px-4 border-2 border-slate-300 shadow-sm font-semibold text-sm w-[18%] text-slate-500"
            >
                <option value="">Filter by platform</option>
                <option v-for="platform in platforms" :key="platform.value" :value="platform.value">
                    {{ platform.label }}
                </option>
            </select>
        </div>

        <!-- Games -->
        <div v-if="!state.loading" class="flex flex-col space-y-4">
            <CardLong v-for="game in games" :key="game.id" :game="game" />
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
