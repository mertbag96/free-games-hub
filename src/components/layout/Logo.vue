<script setup>
import src from '@/assets/img/logo.png'
import Link from '@/components/ui/Link.vue'
import Image from '@/components/ui/Image.vue'
</script>

<template>
    <Link url="/" class="flex items-center space-x-2">
        <Image :src="src" alt="Logo" width="32" height="32" />
        <span class="text-l font-bold text-primary">
            Free Games Hub
        </span>
    </Link>
</template>