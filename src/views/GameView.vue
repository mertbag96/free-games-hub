<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Link from '@/components/ui/Link.vue'
import Image from '@/components/ui/Image.vue'
import LoadingState from '@/components/ui/LoadingState.vue'
import PageContainer from '@/components/ui/PageContainer.vue'
import BackLink from '@/components/ui/BackLink.vue'
import Badge from '@/components/ui/Badge.vue'
import LibraryBookmarkButton from '@/components/ui/LibraryBookmarkButton.vue'
import { useAuthStore } from '@/stores/authStore.js'

const route = useRoute()
const authStore = useAuthStore()

const state = reactive({
    game: {},
    loading: true,
})

const gameLoaded = computed(() => {
    const g = state.game
    return (
        g &&
        typeof g === 'object' &&
        !Array.isArray(g) &&
        typeof g.id !== 'undefined' &&
        g.id !== null
    )
})

const screenshots = computed(() => {
    const shots = state.game?.screenshots
    return Array.isArray(shots) ? shots : []
})

const minimumSpecs = computed(() => state.game?.minimum_system_requirements ?? {})

const specRows = computed(() => {
    const m = minimumSpecs.value
    const rows = [
        ['OS', m.os],
        ['Processor', m.processor],
        ['Memory', m.memory],
        ['Graphics', m.graphics],
        ['Storage', m.storage],
    ].filter(([, val]) => val !== undefined && val !== null && String(val).trim() !== '')
    return rows
})

const metaFacts = computed(() => {
    const g = state.game
    const rows = [
        { label: 'Status', value: g.status },
        { label: 'Genre', value: g.genre },
        { label: 'Platform', value: g.platform },
        { label: 'Publisher', value: g.publisher },
        { label: 'Developer', value: g.developer },
        { label: 'Release date', value: formatDateStatic(g.release_date) },
    ]
    return rows.filter((row) => row.value && String(row.value).trim() !== '')
})

onMounted(async () => {
    try {
        const response = await fetch(`/api/game?id=${route.params.id}`)
        const data = await response.json().catch(() => null)

        const valid =
            data &&
            typeof data === 'object' &&
            !Array.isArray(data) &&
            (data.id != null || Boolean(data.title))

        state.game = valid && response.ok ? data : {}
    } catch (error) {
        console.error('Error fetching game: ', error)
        state.game = {}
    } finally {
        setTimeout(() => {
            state.loading = false
        }, 400)
    }
})

function formatDateStatic(date) {
    if (!date || typeof date !== 'string') return ''
    const [year, month, day] = date.split('-')
    return `${day}.${month}.${year}`
}
</script>

<template>
    <LoadingState v-if="state.loading" />

    <PageContainer v-else-if="gameLoaded" class="relative py-8 pb-16 md:py-10 md:pb-18">
        <div
            class="pointer-events-none absolute left-4 top-[4.5rem] h-64 w-64 rounded-full bg-primary/14 blur-[100px] sm:left-10 md:top-24 lg:left-14"
            aria-hidden="true"
        />
        <div
            class="pointer-events-none absolute bottom-[-5%] right-4 h-72 w-72 rounded-full bg-secondary/[0.12] blur-[110px] sm:right-12"
            aria-hidden="true"
        />

        <div class="relative">
            <BackLink class="mb-8" />

            <article class="relative overflow-hidden rounded-[2rem] border border-secondary/35 bg-secondary text-white shadow-[0_42px_100px_-40px_rgb(0_53_86/0.55)] ring-1 ring-white/10 md:rounded-[2.25rem]">
                <div class="pointer-events-none absolute inset-0 opacity-[0.5]" aria-hidden="true">
                    <div
                        class="absolute inset-0 bg-[radial-gradient(ellipse_110%_80%_at_92%_-30%,rgb(239_76_79/0.32),transparent_58%)]"
                    />
                    <div
                        class="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_-10%_110%,rgb(56_189_248/0.12),transparent_52%)]"
                    />
                    <div
                        class="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgb(255_255_255/0.6)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.6)_1px,transparent_1px)] [background-size:24px_24px]"
                    />
                </div>

                <div
                    class="relative grid gap-10 border-b border-white/10 px-7 py-9 md:gap-12 md:px-10 md:py-11 lg:grid-cols-[minmax(260px,360px)_1fr] lg:items-start"
                >
                    <figure class="relative mx-auto max-w-[20rem] w-full lg:mx-0 lg:max-w-none">
                        <span
                            class="absolute -left-1 -top-1 z-10 inline-flex rounded-md border border-white/35 bg-black/35 px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-[0.22em] text-white/95 backdrop-blur-sm"
                            >ID&nbsp;{{ state.game.id }}</span
                        >
                        <div class="relative aspect-video overflow-hidden rounded-2xl border border-white/20 bg-black/35 shadow-[0_26px_50px_-20px_rgb(0_0_0/0.55)] ring-2 ring-primary/45">
                            <LibraryBookmarkButton
                                v-if="authStore.isSignedIn"
                                :game-id="state.game.id"
                                :game-title="state.game.title"
                                variant="dark"
                                class="!absolute right-3 top-3 z-[15]"
                            />
                            <Image
                                :src="state.game.thumbnail"
                                :alt="state.game.title"
                                class="size-full object-cover"
                            />
                        </div>

                        <div class="mt-5 hidden flex-wrap gap-2 lg:flex lg:justify-center xl:justify-start">
                            <Badge v-if="state.game.genre" variant="solid" class="!shadow-md !shadow-black/35">
                                {{ state.game.genre }}
                            </Badge>
                            <Badge v-if="state.game.platform" variant="outline" class="!border-white/45 !bg-white/10 !text-white">
                                {{ state.game.platform }}
                            </Badge>
                            <Badge
                                v-if="state.game.status"
                                variant="muted"
                                class="!border-0 !bg-white/[0.12] !text-white"
                            >
                                {{ state.game.status }}
                            </Badge>
                        </div>
                    </figure>

                    <div class="min-w-0 space-y-5 md:space-y-6">
                        <div class="flex flex-wrap items-center gap-2 lg:hidden">
                            <Badge v-if="state.game.genre" variant="solid" class="!shadow-md !shadow-black/35">
                                {{ state.game.genre }}
                            </Badge>
                            <Badge v-if="state.game.platform" variant="outline" class="!border-white/45 !bg-white/10 !text-white">
                                {{ state.game.platform }}
                            </Badge>
                            <Badge v-if="state.game.status" variant="muted" class="!border-0 !bg-white/[0.12] !text-white">
                                {{ state.game.status }}
                            </Badge>
                        </div>

                        <header class="space-y-4">
                            <p
                                class="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary/98"
                                style="font-variant-ligatures: none"
                            >
                                Title briefing
                            </p>
                            <h1 class="text-balance text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl xl:text-[2.35rem]">
                                {{ state.game.title }}
                            </h1>
                            <p class="max-w-none text-[0.95rem] leading-[1.7] text-slate-100/92 md:text-base md:text-[1.0625rem]">
                                {{ state.game.description }}
                            </p>
                        </header>

                        <div class="flex flex-wrap gap-3 pt-2">
                            <Link
                                target="_blank"
                                :url="state.game.game_url"
                                class="inline-flex min-h-12 min-w-[11rem] items-center justify-center gap-2 rounded-xl bg-primary px-7 text-[0.9375rem] font-bold uppercase tracking-[0.08em] text-white shadow-[0_22px_40px_-16px_rgb(239_76_79/0.55)] outline-none ring-2 ring-transparent transition-[transform,box-shadow] hover:-translate-y-0.5 hover:bg-primary hover:shadow-[0_28px_50px_-16px_rgb(239_76_79/0.55)] hover:shadow-primary/55 focus-visible:ring-white/95"
                                rel="noopener noreferrer"
                            >
                                Play now
                                <span aria-hidden="true" class="text-[0.85rem] opacity-90">&#8599;</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <dl
                    v-if="metaFacts.length"
                    class="relative grid grid-cols-1 gap-[1px] bg-white/[0.12] p-[1px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
                >
                    <div
                        v-for="fact in metaFacts"
                        :key="fact.label"
                        class="group flex flex-col bg-secondary/94 px-4 py-3.5 backdrop-blur-[2px] sm:min-h-[5.65rem]"
                    >
                        <dt class="font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary/92">
                            {{ fact.label }}
                        </dt>
                        <dd class="mt-2 text-[0.9215rem] font-semibold leading-snug text-white lg:text-[0.9615rem]">
                            {{ fact.value }}
                        </dd>
                        <span class="pointer-events-none mt-auto h-px w-0 rounded-full bg-primary/80 transition-[width] duration-300 group-hover:w-full lg:mt-2" />
                    </div>
                </dl>
            </article>

            <div v-if="screenshots.length" class="relative mt-9 md:mt-11">
                <div class="relative overflow-hidden rounded-2xl border border-slate-200/95 bg-white/95 p-6 shadow-[0_28px_70px_-40px_rgb(0_53_86/0.35)] ring-1 ring-white/95 backdrop-blur-sm md:p-8">
                    <div
                        class="pointer-events-none absolute -left-[28%] -top-[60%] h-56 w-56 rounded-full bg-primary/14 blur-[90px]"
                        aria-hidden="true"
                    />

                    <div class="relative">
                        <p class="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary">
                            Capture feed
                        </p>
                        <h2 id="shots-heading" class="mt-1 text-xl font-bold tracking-tight text-secondary md:text-[1.35rem]">
                            Screenshots gallery
                            <span class="ms-2 font-semibold tabular-nums text-slate-400">({{ screenshots.length }})</span>
                        </h2>
                    </div>

                    <div
                        class="relative mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                        aria-labelledby="shots-heading"
                    >
                        <template
                            v-for="(screenshot, index) in screenshots"
                            :key="`${screenshot.image}-${index}`"
                        >
                            <Link
                                target="_blank"
                                :url="screenshot.image"
                                class="group relative overflow-hidden rounded-xl border border-slate-200/95 bg-slate-100 shadow-inner ring-1 ring-slate-100 transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:ring-primary/25"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    :src="screenshot.image"
                                    :alt="`Screenshot ${index + 1} for ${state.game.title}`"
                                    class="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                                />
                                <span
                                    class="absolute bottom-2 right-2 rounded-md bg-secondary/92 px-2 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-wider text-white/95 opacity-95 shadow-sm"
                                    >#{{ index + 1 }}</span
                                >
                            </Link>
                        </template>
                    </div>
                </div>
            </div>

            <div v-if="specRows.length" class="relative mt-8 md:mt-10">
                <div class="rounded-2xl border border-secondary/22 bg-secondary/[0.04] px-6 py-6 shadow-inner shadow-secondary/[0.06] backdrop-blur-sm md:p-8">
                    <div class="relative">
                        <p class="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary">
                            Compatibility vector
                        </p>
                        <h2 id="spec-heading" class="mt-1 text-xl font-bold tracking-tight text-secondary md:text-[1.35rem]">
                            Minimum system requirements
                        </h2>
                    </div>

                    <div
                        class="mt-6 divide-y divide-slate-200/95 rounded-xl border border-slate-200/92 bg-white/93 ring-1 ring-slate-100"
                        aria-labelledby="spec-heading"
                    >
                        <div
                            v-for="([label, val]) in specRows"
                            :key="label"
                            class="grid gap-3 px-4 py-4 sm:grid-cols-[minmax(8rem,10rem)_1fr] sm:items-start sm:gap-6 md:px-5 md:py-[1.0625rem]"
                        >
                            <span
                                class="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-primary"
                                >{{ label }}</span
                            >
                            <p class="font-mono text-[0.86rem] leading-relaxed text-slate-900 md:text-[0.9175rem]">
                                {{ val }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PageContainer>

    <PageContainer v-else class="flex min-h-page flex-col justify-center py-16 text-center">
        <h1 class="text-xl font-bold text-secondary">Game unavailable</h1>
        <p class="mt-3 text-sm text-slate-600">
            This title could not be loaded. It may have been removed or the link is invalid.
        </p>
        <div class="mt-8 flex justify-center">
            <BackLink />
        </div>
    </PageContainer>
</template>
