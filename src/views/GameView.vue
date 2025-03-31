<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import Link from '@/components/ui/Link.vue'
import Image from '@/components/ui/Image.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { ArrowLeftCircleIcon } from '@heroicons/vue/24/solid'

const route = useRoute()

const state = reactive({
    game: [],
    loading: true,
})

onMounted(async () => {
    try {
        const response = await fetch("/api/game?id=" + route.params.id);
        state.game = await response.json();
    } catch (error) {
        console.error('Error fetching game: ', error);
    } finally {
        setTimeout(() => {
            state.loading = false;
        }, 500);
    }
})

const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
}
</script>

<template>
    <div
        v-if="!state.loading" 
        class="max-w-[92%] md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto py-8">
        <!-- Back to Games -->
        <div class="mb-6">
            <RouterLink 
                to="/games"
                class="flex items-center space-x-2 font-semibold text-primary hover:underline text-sm">
                <ArrowLeftCircleIcon class="size-6"/>
                <span>Back to Games</span>
            </RouterLink>
        </div>

        <!-- Game Details -->
        <div class="flex justify-between">
            <!-- Left -->
            <div class="w-[32%] flex flex-col space-y-4">
                <!-- Image -->
                <Image 
                    :src="state.game.thumbnail" 
                    :alt="state.game.title"
                    class="border rounded-lg shadow"
                />

                <!-- Link -->
                <Link
                    target="_blank"
                    :url="state.game.game_url"
                    class="bg-secondary rounded-lg p-2 font-bold text-slate-50 text-center hover:bg-sky-900 transition-colors duration-200"
                >
                    Play Now
                </Link>
            </div>

            <!-- Right -->
            <div class="w-[64%] flex flex-col space-y-8">
                <!-- Information -->
                <div class="flex flex-col space-y-1">
                    <!-- Title -->
                    <h1 class="font-bold text-primary text-xl">
                        {{ state.game.title }}
                    </h1>

                    <!-- Description -->
                    <p class="text-black">
                        {{ state.game.description }}
                    </p>
                </div>

                <!-- Additional Information -->
                <div class="flex flex-col">
                    <h1 class="mb-4 font-semibold text-secondary">
                        Additional Information
                    </h1>
                    <div class="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        <!-- Status -->
                        <div class="border-2 border-slate-200 rounded-lg shadow-sm flex flex-col p-4">
                            <h6 class="font-semibold text-primary">
                                Status
                            </h6>

                            <p class="text-black">
                                {{ state.game.status }}
                            </p>
                        </div>

                        <!-- Genre -->
                        <div class="border-2 border-slate-200 rounded-lg shadow-sm flex flex-col p-4">
                            <h6 class="font-semibold text-primary">
                                Genre
                            </h6>

                            <p class="text-black">
                                {{ state.game.genre }}
                            </p>
                        </div>

                        <!-- Platform -->
                        <div class="border-2 border-slate-200 rounded-lg shadow-sm flex flex-col p-4">
                            <h6 class="font-semibold text-primary">
                                Platform
                            </h6>

                            <p class="text-black">
                                {{ state.game.platform }}
                            </p>
                        </div>

                        <!-- Publisher -->
                        <div class="border-2 border-slate-200 rounded-lg shadow-sm flex flex-col p-4">
                            <h6 class="font-semibold text-primary">
                                Publisher
                            </h6>

                            <p class="text-black">
                                {{ state.game.publisher }}
                            </p>
                        </div>

                        <!-- Developer -->
                        <div class="border-2 border-slate-200 rounded-lg shadow-sm flex flex-col p-4">
                            <h6 class="font-semibold text-primary">
                                Developer
                            </h6>

                            <p class="text-black">
                                {{ state.game.developer }}
                            </p>
                        </div>

                        <!-- Release Date -->
                        <div class="border-2 border-slate-200 rounded-lg shadow-sm flex flex-col p-4">
                            <h6 class="font-semibold text-primary">
                                Release Date
                            </h6>

                            <p class="text-black">
                                {{ formatDate(state.game.release_date) }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Screenshots -->
                <div class="mt-12 flex flex-col">
                    <h1 class="mb-4 font-semibold text-secondary">
                        Screenshots
                    </h1>
                    <div class="grid grid-cols-1 gap-4">
                        <Link 
                            target="_blank"
                            :url="screenshot.image"
                            v-for="(screenshot, index) in state.game.screenshots" 
                        >
                            <Image 
                                :src="screenshot.image" 
                                :alt="'Screenshot ' + index + 1"
                                class="border rounded-lg shadow-md"
                            />
                        </Link>
                    </div>
                </div>

                <!-- Minimum System Requirements -->
                <div class="flex flex-col">
                    <h1 class="mb-4 font-semibold text-secondary">
                        Minimum System Requirements
                    </h1>
                    
                    <div class="grid grid-cols-1 gap-4">
                        <!-- OS -->
                        <div class="border-2 border-slate-200 rounded-lg shadow-sm flex flex-col p-4">
                            <h6 class="font-semibold text-primary">
                                OS
                            </h6>

                            <p class="text-black">
                                {{ state.game.minimum_system_requirements.os }}
                            </p>
                        </div>

                        <!-- Processor -->
                        <div class="border-2 border-slate-200 rounded-lg shadow-sm flex flex-col p-4">
                            <h6 class="font-semibold text-primary">
                                Processor
                            </h6>

                            <p class="text-black">
                                {{ state.game.minimum_system_requirements.processor }}
                            </p>
                        </div>

                        <!-- Memory -->
                        <div class="border-2 border-slate-200 rounded-lg shadow-sm flex flex-col p-4">
                            <h6 class="font-semibold text-primary">
                                Memory
                            </h6>

                            <p class="text-black">
                                {{ state.game.minimum_system_requirements.memory }}
                            </p>
                        </div>

                        <!-- Graphics -->
                        <div class="border-2 border-slate-200 rounded-lg shadow-sm flex flex-col p-4">
                            <h6 class="font-semibold text-primary">
                                Graphics
                            </h6>

                            <p class="text-black">
                                {{ state.game.minimum_system_requirements.graphics }}
                            </p>
                        </div>

                        <!-- Storage -->
                        <div class="border-2 border-slate-200 rounded-lg shadow-sm flex flex-col p-4">
                            <h6 class="font-semibold text-primary">
                                Storage
                            </h6>

                            <p class="text-black">
                                {{ state.game.minimum_system_requirements.storage }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div 
        v-else 
        class="flex flex-col items-center min-h-page pt-20">
        <PulseLoader :color="'#ef4c4f'" />
        <h1 class="text-2xl font-bold text-secondary">
            Loading
        </h1>
    </div>
</template>