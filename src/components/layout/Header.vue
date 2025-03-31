<script setup>
import { RouterLink } from 'vue-router'
import Logo from '@/components/layout/Logo.vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
</script>

<template>
    <!-- Header -->
    <header class="border-b shadow bg-slate-50">
        <!-- Nav -->
        <nav class="max-w-7xl mx-auto py-4 flex items-center justify-between">
            <!-- Logo -->
            <Logo />

            <!-- Menu -->
            <div class="flex justify-between items-center space-x-4">
                <!-- Search -->
                <RouterLink
                    to="/games"
                >
                    <MagnifyingGlassIcon class="size-7 text-secondary" />
                </RouterLink>

                <!-- Browse Games -->
                <RouterLink 
                    to="/games" 
                    class="bg-secondary rounded-lg p-2 font-semibold text-sm text-slate-50 hover:bg-sky-900 transition-colors duration-200"
                >
                    Browse Games
                </RouterLink>

                <!-- Get Started -->
                <RouterLink 
                    to="/login" 
                    class="bg-primary rounded-lg p-2 font-semibold text-sm text-slate-50 hover:bg-red-600 transition-colors duration-200"
                >
                    Get Started
                </RouterLink>
            </div>
        </nav>
    </header>
</template>