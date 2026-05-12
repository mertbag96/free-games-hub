<script setup>
import { computed } from 'vue'

const props = defineProps({
    type: {
        type: String,
        default: 'button',
    },
    variant: {
        type: String,
        default: 'secondary',
        validator: (v) => ['secondary', 'primary', 'outline'].includes(v),
    },
    block: {
        type: Boolean,
        default: false,
    },
})

const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

const variants = computed(() => {
    switch (props.variant) {
        case 'primary':
            return 'bg-primary text-white shadow-md shadow-primary/25 hover:bg-primary/92 hover:shadow-lg'
        case 'outline':
            return 'border-2 border-slate-200 bg-white text-secondary hover:border-secondary/40 hover:bg-slate-50'
        default:
            return 'bg-secondary text-white shadow-md shadow-secondary/20 hover:bg-secondary/92 hover:shadow-lg'
    }
})

const klass = computed(() =>
    [base, variants.value, props.block ? 'w-full' : ''].join(' '),
)
</script>

<template>
    <button :type="type" :class="klass">
        <slot />
    </button>
</template>
