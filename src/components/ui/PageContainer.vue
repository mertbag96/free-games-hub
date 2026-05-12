<script setup>
/**
 * Centers page content with consistent horizontal rhythm and optional vertical padding.
 */
defineProps({
    width: {
        type: String,
        default: 'standard',
        validator: (v) => ['standard', 'narrow', 'wide'].includes(v),
    },
})

const widths = {
    standard: 'max-w-7xl',
    narrow: 'max-w-lg',
    wide: 'max-w-[1536px]',
}
</script>

<template>
    <div :class="[widths[width], 'mx-auto w-full px-4 sm:px-6 lg:px-8']">
        <slot />
    </div>
</template>
