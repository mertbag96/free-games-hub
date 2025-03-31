<script setup>
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'
import Image from '@/components/ui/Image.vue'

defineProps({
    game: {
        type: Object,
        required: true
    }
})

const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
}
</script>

<template>
    <RouterLink
        :to="'/games/' + game.id">
        <div class="border shadow-md rounded-lg bg-slate-50 flex justify-between p-4 hover:scale-[101%] transition duration-200">
            <!-- Thumbnail -->
            <Image 
                :src="game.thumbnail" 
                :alt="game.title" 
                class="rounded-t-lg shadow-sm w-[16%]" 
            />

            <!-- Details -->
            <div class="flex flex-col justify-between w-[84%] ps-4">
                <!-- Title, Release Date & Description -->
                <div class="flex flex-col space-y-2">
                    <!-- Title & Release Date -->
                    <div class="flex justify-between items-center">
                        <!-- Title -->
                        <h1 class="font-bold text-secondary">
                            {{ game.title }}
                        </h1>

                        <!-- Release Date -->
                        <span class="font-semibold text-secondary text-sm">
                            {{ formatDate(game.release_date) }}
                        </span>
                    </div>

                    <!-- Description -->
                    <p class="text-sm text-gray-600 line-clamp-2 sm:line-clamp-1 md:line-clamp-2">
                        {{ game.short_description }}
                    </p>
                </div>

                <!-- Genre, Platform, Publisher -->
                <div class="flex items-center space-x-2">
                    <!-- Genre -->
                    <span class="bg-primary py-1 px-2 rounded-lg font-semibold text-slate-50 text-xs">
                        {{ game.genre }}
                    </span>

                    <!-- Platform -->
                    <span class="bg-primary py-1 px-2 rounded-lg font-semibold text-slate-50 text-xs">
                        {{ game.platform }}
                    </span>

                    <!-- Publisher -->
                    <span class="bg-primary py-1 px-2 rounded-lg font-semibold text-slate-50 text-xs">
                        {{ game.publisher }}
                    </span>
                </div>
            </div>
        </div>
    </RouterLink>
</template>