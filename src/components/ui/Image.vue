<script setup>
import { defineProps } from 'vue'

defineProps({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        default: ''
    },
    class: {
        type: String,
        default: ''
    },
    width: {
        type: [String, Number],
        default: 'auto'
    },
    height: {
        type: [String, Number],
        default: 'auto'
    },
})
</script>

<template>
    <img :src="src" :alt="alt" :class="class" :width="width" :height="height" />
</template>