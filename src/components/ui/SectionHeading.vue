<script setup>
defineProps({
    /** Main visible title */
    title: {
        type: String,
        required: true,
    },
    /** Shown after title in parentheses, e.g. count */
    suffix: {
        type: [String, Number],
        default: '',
    },
})
</script>

<template>
    <div class="mb-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h2 class="text-xl font-bold tracking-tight text-primary sm:text-2xl">
            {{ title }}
            <template v-if="suffix !== '' && suffix !== null && suffix !== undefined">
                <span class="font-semibold text-slate-500"> ({{ suffix }})</span>
            </template>
        </h2>
        <div v-if="$slots.actions" class="flex flex-wrap items-center gap-2">
            <slot name="actions" />
        </div>
    </div>
</template>
