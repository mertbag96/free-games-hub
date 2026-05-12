<script setup>
import Link from '@/components/ui/Link.vue'
import Logo from '@/components/layout/Logo.vue'
import { RouterLink } from 'vue-router'

const linkNav =
    'text-left text-sm font-medium text-slate-600 underline-offset-2 transition-colors hover:text-primary hover:underline'

const headingClass = 'text-[0.65rem] font-bold uppercase tracking-[0.14em] text-slate-400'
</script>

<template>
    <footer class="mt-auto border-t border-slate-200/90 bg-white/85 backdrop-blur-sm">
        <div
            class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12"
            aria-labelledby="footer-site-label"
        >
            <span id="footer-site-label" class="sr-only">Site footer</span>

            <div class="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-14">
                <div class="max-w-xs shrink-0">
                    <Logo />
                    <p class="mt-4 text-sm leading-relaxed text-slate-600">
                        Free-to-play catalogue and bookmarks in one hub.
                    </p>
                </div>

                <div
                    class="flex flex-col gap-10 sm:flex-row sm:flex-wrap sm:justify-end sm:gap-x-14 lg:gap-x-20 xl:gap-x-24"
                >
                    <!-- Mirror header browsing links -->
                    <nav class="flex min-w-[10rem] flex-col gap-2.5" aria-label="Explore">
                        <p :class="headingClass">Explore</p>
                        <RouterLink to="/platforms" :class="linkNav">Platforms</RouterLink>
                        <RouterLink to="/categories" :class="linkNav">Categories</RouterLink>
                        <RouterLink to="/library" :class="linkNav">My Library</RouterLink>
                        <RouterLink to="/games" :class="linkNav">Browse Games</RouterLink>
                    </nav>

                    <nav class="flex min-w-[10rem] flex-col gap-2.5" aria-label="Legal">
                        <p :class="headingClass">Legal</p>
                        <RouterLink to="/privacy" :class="linkNav">Privacy policy</RouterLink>
                        <RouterLink to="/terms" :class="linkNav">Terms of use</RouterLink>
                    </nav>
                </div>
            </div>

            <div class="mt-10 border-t border-slate-200/85 pt-6">
                <div
                    class="flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6"
                >
                    <p class="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span>Data provided by</span>
                        <Link
                            url="https://freetogame.com/"
                            class="font-semibold text-primary underline decoration-transparent underline-offset-2 transition-colors hover:text-secondary hover:decoration-secondary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            FreeToGame
                        </Link>
                    </p>
                    <p class="flex flex-wrap items-center gap-x-1.5 gap-y-1 sm:justify-end">
                        <span>Designed & Developed by</span>
                        <Link
                            url="https://github.com/mertbag96"
                            class="font-semibold text-primary underline decoration-transparent underline-offset-2 transition-colors hover:text-secondary hover:decoration-secondary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Mert Bağ
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>
