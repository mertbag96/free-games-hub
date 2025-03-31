<script setup>
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'
import Link from '@/components/ui/Link.vue'
import Image from '@/components/ui/Image.vue'

defineProps({
    game: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="border shadow-md rounded-lg bg-slate-50 h-full flex flex-col">
        <!-- Thumbnail -->
        <Image 
            :src="game.thumbnail" 
            :alt="game.title" 
            class="rounded-t-lg shadow-sm w-full" 
        />

        <!-- Details -->
        <div class="flex flex-col gap-4 p-4">
            <!-- Title -->
            <h1 class="font-bold text-secondary">
                {{ game.title }}
            </h1>

            <!-- Description -->
            <p class="text-sm text-gray-600 line-clamp-2 sm:line-clamp-1 md:line-clamp-2">
                {{ game.short_description }}
            </p>

            <!-- Actions -->
            <div class="flex justify-between items-center">
                <!-- See Details -->
                <RouterLink 
                    :to="'/games/' + game.id"
                    class="w-[48%] rounded bg-primary sm:px-1 p-2 font-semibold text-slate-50 text-xs text-center hover:bg-red-600 transition-colors duration-200"
                >
                    See Details
                </RouterLink>

                <!-- Play Now -->
                <Link 
                    target="_blank"
                    :url="game.game_url" 
                    class="w-[48%] rounded bg-secondary sm:px-1 p-2 font-semibold text-slate-50 text-xs text-center hover:bg-sky-900 transition-colors duration-200"
                >
                    Play Now
                </Link>
            </div>
        </div>
    </div>
</template>