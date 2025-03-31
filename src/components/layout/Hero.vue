<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <!-- Hero Section -->
    <section class="hero-bg flex flex-col items-center text-center py-20 text-slate-50 space-y-6">
        <!-- Title -->
        <h1 class="text-2xl sm:text-4xl font-bold leading-tight tracking-wide drop-shadow-md">
            Discover the best <span class="text-primary">free-to-play</span> games!
        </h1>

        <!-- Description -->
        <p class="mt-4 text-md sm:text-lg text-slate-50 max-w-xl">
            Explore a vast collection of free games and find your next adventure. Join millions of players worldwide!
        </p>

        <!-- Links -->
        <div class="flex space-x-4">
            <!-- Browse Games -->
            <RouterLink 
                to="/games" 
                class="py-2 px-4 rounded-lg bg-transparent border-2 border-slate-50 font-bold text-sm sm:text-md text-slate-50 hover:bg-slate-50 hover:text-primary transition-colors duration-300">
                Browse Games
            </RouterLink>

            <!-- Get Started -->
            <RouterLink 
                to="/login" 
                class="py-2 px-4 rounded-lg bg-primary border-2 border-primary font-bold text-sm sm:text-md text-slate-50 hover:bg-red-600 hover:border-red-600 transition-colors duration-300">
                Get Started
            </RouterLink>
        </div>
    </section>
</template>

<style>
.hero-bg {
    background: url('@/assets/img/bg.png') no-repeat;
}
</style>