<script setup>
import Link from '@/components/ui/Link.vue'
import Image from '@/components/ui/Image.vue'
import ButtonLink from '@/components/ui/ButtonLink.vue'
import LibraryBookmarkButton from '@/components/ui/LibraryBookmarkButton.vue'
import { useAuthStore } from '@/stores/authStore.js'

defineProps({
    game: {
        type: Object,
        required: true,
    },
})

const authStore = useAuthStore()
</script>

<template>
    <article
        class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_1px_3px_rgb(15_23_42/0.06)] ring-1 ring-slate-100 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-lg"
    >
        <div class="relative aspect-video overflow-hidden bg-slate-900/5">
            <LibraryBookmarkButton
                v-if="authStore.isSignedIn"
                :game-id="game.id"
                :game-title="game.title"
                variant="light"
                class="!absolute right-3 top-3 z-[5]"
            />
            <Image
                :src="game.thumbnail"
                :alt="game.title"
                class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            />
        </div>
        <div class="flex flex-1 flex-col gap-3 p-4 sm:p-5">
            <h3 class="line-clamp-2 text-lg font-bold leading-snug tracking-tight text-secondary">
                {{ game.title }}
            </h3>
            <p class="line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">
                {{ game.short_description }}
            </p>
            <div class="mt-auto grid grid-cols-2 gap-2">
                <ButtonLink
                    :to="'/games/' + game.id"
                    variant="primary"
                    class="!px-2 !py-2 !text-xs sm:!text-sm"
                >
                    Details
                </ButtonLink>
                <Link
                    target="_blank"
                    :url="game.game_url"
                    class="inline-flex items-center justify-center rounded-xl bg-secondary px-2 py-2 text-center text-xs font-semibold text-white shadow-md shadow-secondary/20 transition-colors hover:bg-secondary/92 sm:text-sm"
                >
                    Play Now
                </Link>
            </div>
        </div>
    </article>
</template>
