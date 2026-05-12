<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

defineProps({
    message: {
        type: String,
        default: 'Loading',
    },
    compact: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <div
        :class="
            compact
                ? 'flex flex-col items-center justify-center gap-4 py-12'
                : 'flex min-h-page flex-col items-center justify-center gap-5 pt-12 pb-24'
        "
        role="status"
        aria-live="polite"
    >
        <PulseLoader color="#ef4c4f" />
        <p class="text-lg font-semibold tracking-tight text-secondary">
            {{ message }}
        </p>
    </div>
</template>
