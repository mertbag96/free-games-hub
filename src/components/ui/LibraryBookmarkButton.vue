<script setup>
import { computed } from 'vue'
import { BookmarkIcon as BookmarkSolid } from '@heroicons/vue/24/solid'
import { BookmarkIcon as BookmarkOutline } from '@heroicons/vue/24/outline'
import { useLibraryStore } from '@/stores/libraryStore.js'

const props = defineProps({
    gameId: {
        type: [String, Number],
        required: true,
    },
    gameTitle: {
        type: String,
        default: '',
    },
    /** `light`: cards on white · `dark`: detail hero overlays */
    variant: {
        type: String,
        default: 'light',
        validator: (v) => ['light', 'dark'].includes(v),
    },
})

const library = useLibraryStore()

const normalizedId = computed(() => String(props.gameId))

const saved = computed(() => library.has(normalizedId.value))

const shellClass = computed(() =>
    props.variant === 'dark'
        ? [
              'rounded-lg border border-white/35 bg-black/35 p-2 text-white shadow-lg shadow-black/30 backdrop-blur-md',
              'ring-1 ring-white/25 transition-[transform,background-color]',
              'hover:bg-black/48 hover:border-white/47 focus-visible:bg-black/52',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary/90',
          ].join(' ')
        : [
              'rounded-lg border border-slate-200/95 bg-white/92 p-2 text-secondary shadow-md shadow-black/14 backdrop-blur-sm',
              'ring-1 ring-white/96 transition-[transform,border-color,background-color,color]',
              'hover:border-primary/42 hover:bg-white hover:text-primary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          ].join(' '),
)

function onClick(event) {
    event.preventDefault()
    event.stopPropagation()
    library.toggle(normalizedId.value, props.gameTitle)
}
</script>

<template>
    <button
        type="button"
        class="touch-manipulation [transform:translateZ(0)]"
        :class="shellClass"
        :aria-label="
            saved
                ? 'Remove game from library'
                : 'Add game to library'
        "
        :aria-pressed="saved"
        @click="onClick"
    >
        <BookmarkSolid v-if="saved" class="size-5 shrink-0 text-primary" aria-hidden="true" />
        <BookmarkOutline v-else class="size-5 shrink-0" aria-hidden="true" />
    </button>
</template>
