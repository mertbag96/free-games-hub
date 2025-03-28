<script setup>
import { defineProps } from 'vue'

defineProps({
    url: {
        type: String,
        required: true
    },
    class: {
        type: String,
        default: ''
    },
})
</script>

<template>
    <a :href="url" :class="class">
        <slot></slot>
    </a>
</template>