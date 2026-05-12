<script setup>
/**
 * Touch-friendly segmented control for filtering by platform slug (API values).
 */
const model = defineModel({ required: true })

defineProps({
    labelId: {
        type: String,
        default: 'games-platform-heading',
    },
})

const presets = [
    { label: 'All platforms', short: 'All', value: '', aria: 'All platforms' },
    { label: 'Windows', short: 'Windows', value: 'pc', aria: 'Windows (PC)' },
    { label: 'Browser', short: 'Browser', value: 'browser', aria: 'Browser' },
]
</script>

<template>
    <div role="radiogroup" :aria-labelledby="labelId">
        <p :id="labelId" class="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-slate-500">
            Platform
        </p>
        <!-- Single fixed row — never wraps; chip text truncates safely on ultra-narrow widths -->
        <div class="mt-2 grid grid-cols-3 gap-2">
            <button
                v-for="opt in presets"
                :key="opt.value === '' ? 'all' : opt.value"
                type="button"
                role="radio"
                :aria-checked="model === opt.value"
                :aria-label="opt.aria ?? opt.label"
                class="flex h-10 max-w-full shrink-0 items-center justify-center gap-1 rounded-xl border px-1.5 text-[0.8rem] font-semibold outline-none ring-secondary/60 transition-[background-color,color,box-shadow,transform] [-webkit-tap-highlight-color:transparent] focus-visible:ring-2 focus-visible:ring-offset-2 sm:h-11 sm:px-2 sm:text-[0.875rem]"
                :class="
                    model === opt.value
                        ? 'border-secondary bg-secondary text-white shadow-md shadow-secondary/25'
                        : 'border-transparent bg-white text-secondary shadow-[inset_0_2px_7px_rgb(15_23_42/0.05)] ring-1 ring-slate-200/90 hover:ring-slate-300 active:scale-[0.98]'
                "
                @click="model = opt.value"
            >
                <span class="min-w-0 truncate">{{ opt.short }}</span>
            </button>
        </div>
    </div>
</template>
