<script setup>
import { RouterLink } from 'vue-router'
import Image from '@/components/ui/Image.vue'
import Badge from '@/components/ui/Badge.vue'

defineProps({
    game: {
        type: Object,
        required: true,
    },
})

const formatDate = (date) => {
    if (!date) return ''
    const [year, month, day] = date.split('-')
    return `${day}.${month}.${year}`
}
</script>

<template>
    <RouterLink
        :to="'/games/' + game.id"
        class="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
        <article
            class="flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-[0_1px_3px_rgb(15_23_42/0.06)] ring-1 ring-slate-100 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-stretch sm:gap-5 sm:p-5"
        >
            <div
                class="aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:w-40 md:w-44 lg:w-48"
            >
                <Image
                    :src="game.thumbnail"
                    :alt="game.title"
                    class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                />
            </div>
            <div class="flex min-w-0 flex-1 flex-col justify-between gap-4">
                <div class="space-y-2">
                    <div class="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <h3 class="text-lg font-bold leading-snug text-secondary md:text-xl">
                            {{ game.title }}
                        </h3>
                        <time
                            v-if="game.release_date"
                            class="whitespace-nowrap text-sm font-semibold text-slate-500 tabular-nums sm:pt-0.5"
                            :datetime="game.release_date"
                        >
                            {{ formatDate(game.release_date) }}
                        </time>
                    </div>
                    <p class="line-clamp-2 text-sm leading-relaxed text-slate-600 md:line-clamp-3">
                        {{ game.short_description }}
                    </p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <Badge v-if="game.genre">{{ game.genre }}</Badge>
                    <Badge v-if="game.platform">{{ game.platform }}</Badge>
                    <Badge v-if="game.publisher" variant="muted">{{ game.publisher }}</Badge>
                </div>
            </div>
        </article>
    </RouterLink>
</template>
