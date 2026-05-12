<script setup>
import { RouterLink } from 'vue-router'
import { ArrowLeftCircleIcon } from '@heroicons/vue/24/solid'

defineProps({
    to: {
        type: [String, Object],
        default: '/games',
    },
    label: {
        type: String,
        default: 'Back to Games',
    },
})
</script>

<template>
    <RouterLink
        :to="to"
        class="group inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-primary"
    >
        <ArrowLeftCircleIcon
            class="size-6 text-primary transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
        />
        <span
            class="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-primary"
        >
            {{ label }}
        </span>
    </RouterLink>
</template>
