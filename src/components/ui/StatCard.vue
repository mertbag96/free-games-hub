<script setup>
defineProps({
    label: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <div
        class="flex flex-col rounded-2xl border border-slate-200/90 bg-white/80 p-4 shadow-[0_1px_3px_rgb(15_23_42/0.06)] ring-1 ring-slate-100 backdrop-blur-sm transition-shadow hover:shadow-md"
    >
        <h3 class="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-primary">
            {{ label }}
        </h3>
        <p class="mt-2 text-[0.9375rem] leading-relaxed text-slate-800">
            <slot />
        </p>
    </div>
</template>
