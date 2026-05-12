<script setup>
import { computed } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

const model = defineModel({ required: true })

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        default: '',
    },
    options: {
        type: Array,
        required: true,
        /** { label, value } */
    },
    /** `default`: simple forms · `filter`: games browse toolbar */
    variant: {
        type: String,
        default: 'default',
        validator: (v) => ['default', 'filter'].includes(v),
    },
})

const isFilter = computed(() => props.variant === 'filter')

const labelClass = computed(() =>
    isFilter.value
        ? 'text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-slate-500'
        : 'text-sm font-medium text-slate-700',
)

const selectClass = computed(() =>
    [
        'peer relative z-[1] w-full min-h-[3rem] cursor-pointer appearance-none rounded-2xl border-0 bg-white',
        'shadow-[inset_0_2px_10px_rgb(15_23_42/0.06)] ring-1 ring-inset ring-slate-200/95',
        'py-3 ps-5 pe-[3rem] text-[0.9375rem] font-medium text-secondary',
        'transition-[background-color,box-shadow,ring-color]',
        'hover:bg-slate-50/90 hover:ring-slate-300',
        'focus-visible:bg-white focus-visible:shadow-[0_0_0_3px_rgb(239_76_79/0.15),inset_0_1px_6px_rgb(15_23_42/0.04)] focus-visible:outline-none focus-visible:ring-secondary',
        '[&::-ms-expand]:hidden',
    ].join(' '),
)

const wrapperGap = computed(() => (isFilter.value ? 'gap-2.5' : 'gap-2'))

const legacySelectClass = computed(() =>
    [
        'w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-10 text-sm font-medium text-slate-800 outline-none ring-secondary/40 transition-[box-shadow,border-color]',
        'focus:border-secondary focus:ring-2',
    ].join(' '),
)
</script>

<template>
    <div :class="['flex min-w-0 flex-1 flex-col', wrapperGap]">
        <label v-if="label" :for="id" :class="labelClass">
            {{ label }}
        </label>
        <div class="relative">
            <select
                :id="id"
                v-model="model"
                :name="name"
                :class="variant === 'filter' ? selectClass : legacySelectClass"
            >
                <option v-if="placeholder" value="">
                    {{ placeholder }}
                </option>
                <option v-for="opt in options" :key="String(opt.value)" :value="opt.value">
                    {{ opt.label }}
                </option>
            </select>
            <!-- Filter mode: chunky chevron control -->
            <span
                v-if="variant === 'filter'"
                class="pointer-events-none absolute inset-y-1.5 end-1.5 z-[2] flex w-10 items-center justify-center rounded-xl bg-secondary/8 text-secondary transition-colors peer-focus-visible:bg-primary peer-focus-visible:text-white"
                aria-hidden="true"
            >
                <ChevronDownIcon class="size-5" />
            </span>

            <!-- Default chevron strip -->
            <span
                v-else
                class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400"
                aria-hidden="true"
            >
                <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </span>
        </div>
    </div>
</template>
