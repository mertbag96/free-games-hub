<script setup>
defineProps({
    variant: {
        type: String,
        default: 'solid',
        validator: (v) => ['solid', 'muted', 'outline'].includes(v),
    },
})
</script>

<template>
    <span
        :class="[
            'inline-flex max-w-full truncate rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold leading-none',
            variant === 'solid' && 'bg-primary text-white shadow-sm',
            variant === 'muted' && 'bg-secondary/10 text-secondary',
            variant === 'outline' &&
                'border border-secondary/20 bg-white text-secondary',
        ]"
    >
        <slot />
    </span>
</template>
