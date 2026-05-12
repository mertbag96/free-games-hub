<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
    to: {
        type: [String, Object],
        required: true,
    },
    variant: {
        type: String,
        default: 'secondary',
        validator: (v) =>
            ['secondary', 'primary', 'ghost', 'outline-hero-light', 'outline-hero-accent'].includes(
                v,
            ),
    },
})

const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'

const variants = computed(() => {
    switch (props.variant) {
        case 'primary':
            return 'bg-primary text-white shadow-md shadow-primary/25 hover:bg-primary/92 hover:shadow-lg'
        case 'ghost':
            return 'border border-transparent text-secondary hover:bg-slate-100'
        case 'outline-hero-light':
            return 'border-2 border-white/95 bg-white/5 text-white shadow-sm backdrop-blur-[2px] hover:bg-white hover:text-secondary'
        case 'outline-hero-accent':
            return 'border-2 border-primary bg-primary text-white hover:border-primary hover:bg-primary/90'
        default:
            return 'bg-secondary text-white shadow-md shadow-secondary/20 hover:bg-secondary/92 hover:shadow-lg'
    }
})

const klass = computed(() => [base, variants.value].join(' '))
</script>

<template>
    <RouterLink :to="to" :class="klass">
        <slot />
    </RouterLink>
</template>
