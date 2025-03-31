<script setup>
import { RouterLink } from 'vue-router'
import src from '@/assets/img/logo.png'
import Image from '@/components/ui/Image.vue'
</script>

<template>
    <!-- Logo -->
    <RouterLink 
        to="/" 
        class="flex items-center space-x-2"
    >
        <Image :src="src" alt="Logo" width="32" height="32" />
        <span class="text-l font-bold text-primary">
            Free Games Hub
        </span>
    </RouterLink>
</template>