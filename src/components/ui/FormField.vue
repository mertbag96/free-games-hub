<script setup>
import { computed, useSlots } from 'vue'

const model = defineModel({ required: true })
const slots = useSlots()

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text',
    },
    name: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        default: '',
    },
    autocomplete: {
        type: String,
        default: 'off',
    },
    minlength: {
        type: Number,
        default: undefined,
    },
    /** `default`: auth screens · `filter`: browse/search toolbars */
    variant: {
        type: String,
        default: 'default',
        validator: (v) => ['default', 'filter'].includes(v),
    },
})

const labelClass = computed(() =>
    props.variant === 'filter'
        ? 'text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-slate-500'
        : 'text-sm font-medium text-slate-700',
)

const wrapperGap = computed(() => (props.variant === 'filter' ? 'gap-2.5' : 'gap-2'))

const inputClass = computed(() => {
    const hasPrefix = Boolean(slots.prefix)

    if (props.variant === 'filter') {
        return [
            'peer relative z-[1]',
            'min-h-[3rem] w-full rounded-2xl border-0 bg-white',
            'shadow-[inset_0_2px_10px_rgb(15_23_42/0.06)]',
            'ring-1 ring-inset ring-slate-200/95',
            'text-[0.9375rem] leading-snug text-slate-900 placeholder:text-slate-400 placeholder:font-normal',
            'transition-[background-color,box-shadow,ring-color]',
            'hover:bg-slate-50/90 hover:ring-slate-300',
            'focus-visible:bg-white focus-visible:shadow-[0_0_0_3px_rgb(239_76_79/0.15),inset_0_1px_6px_rgb(15_23_42/0.04)] focus-visible:outline-none focus-visible:ring-secondary',
            hasPrefix ? 'ps-[3rem]' : 'ps-5',
            'pe-5',
        ].join(' ')
    }

    return [
        'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900',
        'outline-none ring-secondary/40 transition-[box-shadow,border-color]',
        'placeholder:text-slate-400 focus:border-secondary focus:ring-2',
    ].join(' ')
})

const isFilter = computed(() => props.variant === 'filter')
</script>

<template>
    <div :class="['flex min-w-0 flex-col', wrapperGap]">
        <label :for="id" :class="labelClass">
            {{ label }}
        </label>
        <div class="relative">
            <!-- Input rendered first so succeeding `.peer-*` decorators on icons work -->
            <input
                :id="id"
                v-model="model"
                :name="name"
                :class="inputClass"
                :type="type"
                :placeholder="placeholder"
                :autocomplete="autocomplete"
                :minlength="minlength"
                :inputmode="isFilter && type === 'search' ? 'search' : undefined"
            />
            <span
                v-if="$slots.prefix"
                class="pointer-events-none absolute inset-y-0 start-0 z-[2] flex w-12 items-center justify-center text-slate-400 transition-colors peer-focus-visible:text-secondary"
                aria-hidden="true"
            >
                <slot name="prefix" />
            </span>
        </div>
    </div>
</template>
