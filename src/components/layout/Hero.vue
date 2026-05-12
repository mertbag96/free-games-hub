<script setup>
import ButtonLink from '@/components/ui/ButtonLink.vue'
import { useAuthStore } from '@/stores/authStore.js'

const authStore = useAuthStore()
</script>

<template>
    <section class="relative isolate overflow-hidden border-b border-secondary/20">
        <div class="hero-bg absolute inset-0" aria-hidden="true" />
        <div class="hero-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
            class="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8"
        >
            <p class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Discover &amp; play
            </p>
            <h1
                class="max-w-3xl text-balance text-3xl font-bold leading-[1.15] tracking-tight text-white drop-shadow sm:text-4xl md:text-5xl"
            >
                Discover the best
                <span class="text-primary">free-to-play</span>
                games!
            </h1>
            <p
                class="mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-100/95 sm:text-lg"
            >
                Explore a curated library of free titles and find your next adventure. Join millions
                of players worldwide!
            </p>
            <div class="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <ButtonLink to="/games" variant="outline-hero-light">Browse Games</ButtonLink>
                <ButtonLink
                    v-if="!authStore.isSignedIn"
                    to="/sign-in"
                    variant="outline-hero-accent"
                >
                    Get Started
                </ButtonLink>
            </div>
        </div>
    </section>
</template>

<style scoped>
.hero-bg {
    background: url('@/assets/img/bg.png') center / cover no-repeat;
}
.hero-overlay {
    /*
     * Futuristic stack: asymmetric “neon rim” reds + cinematic navy depth + diagonal skim.
     * First paint is top-most; last is deepest.
     */
    background:
        radial-gradient(
            ellipse 92% 75% at 98% -8%,
            rgb(255 77 109 / 0.32) 0%,
            rgb(239 76 79 / 0.12) 44%,
            transparent 64%
        ),
        radial-gradient(
            ellipse 70% 55% at 2% 102%,
            rgb(239 76 79 / 0.13) 0%,
            transparent 58%
        ),
        linear-gradient(
            118deg,
            rgb(239 76 79 / 0.16) 0%,
            rgb(239 76 79 / 0.035) 26%,
            transparent 48%
        ),
        linear-gradient(
            185deg,
            rgb(0 53 86 / 0.4) 0%,
            rgb(2 24 42 / 0.5) 48%,
            rgb(15 23 42 / 0.62) 100%
        );
}
</style>
