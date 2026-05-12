<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import PageContainer from '@/components/ui/PageContainer.vue'
import { GAME_CATEGORIES, GAME_PLATFORMS } from '@/data/gameFilters.js'
import { Squares2X2Icon, ServerStackIcon, ComputerDesktopIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
    gamesCount: {
        type: Number,
        default: 0,
    },
    loading: {
        type: Boolean,
        default: true,
    },
})

const categoryCount = GAME_CATEGORIES.length
const platformCount = GAME_PLATFORMS.length

const formattedGamesCount = computed(() =>
    props.loading ? '' : props.gamesCount.toLocaleString(),
)

const stats = computed(() => [
    {
        id: 'games',
        icon: ServerStackIcon,
        value: formattedGamesCount.value,
        label: 'Total games',
        body: 'Every free-to-play title we sync from FreeToGame, searchable and sorted on the browse screen.',
        href: '/games',
        linkLabel: 'Browse all',
        showSkeleton: props.loading,
    },
    {
        id: 'platforms',
        icon: ComputerDesktopIcon,
        value: String(platformCount),
        label: 'Platforms',
        body: 'Full Windows installs plus browser-ready games. Pick either from the catalogue filters.',
        href: '/platforms',
        linkLabel: 'See platforms',
        showSkeleton: false,
    },
    {
        id: 'categories',
        icon: Squares2X2Icon,
        value: String(categoryCount),
        label: 'Categories',
        body: 'Genre and tag presets spanning shooters, RPGs, MMOs, and dozens of other vibes.',
        href: '/categories',
        linkLabel: 'See categories',
        showSkeleton: false,
    },
])
</script>

<template>
    <section class="border-t border-slate-200/85 bg-gradient-to-b from-slate-50/95 to-white/90">
        <PageContainer class="py-12 md:py-14">
            <div class="mb-8 md:mb-10">
                <p class="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-primary">Overview</p>
                <h2 class="mt-2 text-xl font-bold tracking-tight text-secondary sm:text-2xl">Catalog snapshot</h2>
                <p class="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-[0.9375rem]">
                    A quick footprint before you dive into new releases above or jump into browse and categories.
                </p>
            </div>

            <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
                <li v-for="item in stats" :key="item.id">
                    <article
                        class="group flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_14px_40px_-24px_rgb(0_53_86/0.35)] shadow-secondary/[0.08] ring-1 ring-slate-100 transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/15"
                    >
                        <div class="mb-5 flex items-start justify-between gap-3">
                            <span
                                class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-colors group-hover:bg-primary group-hover:text-white"
                            >
                                <component :is="item.icon" class="size-6" aria-hidden="true" />
                            </span>
                            <div
                                v-if="item.showSkeleton"
                                class="h-10 w-[4.25rem] rounded-xl bg-slate-200/90 motion-safe:animate-pulse"
                                aria-hidden="true"
                            />
                            <p
                                v-else
                                class="tabular-nums text-right text-3xl font-bold tracking-tight text-secondary sm:text-4xl sm:leading-none"
                            >
                                {{ item.value }}
                            </p>
                        </div>
                        <h3 class="text-base font-semibold text-secondary">
                            {{ item.label }}
                        </h3>
                        <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                            {{ item.body }}
                        </p>
                        <RouterLink
                            :to="item.href"
                            class="mt-5 inline-flex w-fit items-center rounded-lg text-sm font-semibold text-primary underline decoration-transparent underline-offset-4 outline-none transition-colors hover:text-secondary hover:decoration-current focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                        >
                            {{ item.linkLabel }}
                            <span class="transition-transform group-hover:translate-x-0.5" aria-hidden="true">&nbsp;&rarr;</span>
                        </RouterLink>
                    </article>
                </li>
            </ul>
        </PageContainer>
    </section>
</template>
