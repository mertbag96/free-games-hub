<script setup>
import { RouterLink } from 'vue-router'
import src from '@/assets/img/logo.png'
import Image from '@/components/ui/Image.vue'
</script>

<template>
    <RouterLink to="/" class="group flex items-center gap-2.5 rounded-xl py-1 outline-none ring-secondary/30 focus-visible:ring-2 focus-visible:ring-offset-2">
        <Image
            :src="src"
            alt="Free Games Hub"
            width="32"
            height="32"
            class="size-8 shrink-0 transition-transform group-hover:scale-105"
        />
        <span
            class="text-base font-bold tracking-tight text-primary sm:text-lg sm:tracking-tight"
        >
            Free Games Hub
        </span>
    </RouterLink>
</template>
