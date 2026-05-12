<script setup>
import { computed } from 'vue'
import PageContainer from '@/components/ui/PageContainer.vue'

/**
 * Wraps authentication forms with a stacked layout aligned to the shell’s max-width.
 */
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    mode: {
        type: String,
        required: true,
        validator: (v) => ['sign-in', 'sign-up'].includes(v),
    },
})

const deckTitle = computed(() =>
    props.mode === 'sign-in' ? 'Re-enter your secure session' : 'Spin up your Free Games Hub identity',
)

const bullets = computed(() =>
    props.mode === 'sign-in'
        ? [
              'Firebase-backed credential checks with sane error surfacing.',
              'Browse the catalogue without signing in — auth unlocks upcoming personalization.',
              'Google SSO or classic email/password, your call.',
          ]
        : [
              'One lightweight account anchors future library + wishlists.',
              'We never sell addresses; Firebase manages the cryptographic heavy lifting.',
              'Six characters minimum now, stronger secrets always welcome.',
          ],
)
</script>

<template>
    <section class="relative flex min-h-page items-center overflow-hidden py-14 sm:py-16 lg:py-20">
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-50/98 via-white to-white" />

        <div
            class="pointer-events-none absolute -left-[20%] top-[-35%] h-[380px] w-[380px] rounded-full bg-primary/16 blur-[120px]"
            aria-hidden="true"
        />
        <div
            class="pointer-events-none absolute bottom-[-30%] right-[-12%] h-[340px] w-[340px] rounded-full bg-secondary/[0.16] blur-[110px]"
            aria-hidden="true"
        />

        <div
            class="pointer-events-none absolute inset-0 opacity-[0.35] bg-[linear-gradient(rgb(226_232_240/0.45)_1px,transparent_1px),linear-gradient(90deg,rgb(226_232_240/0.45)_1px,transparent_1px)] bg-[size:56px_56px]"
            aria-hidden="true"
        />

        <PageContainer class="relative w-full">
            <div class="mx-auto grid w-full max-w-5xl items-stretch gap-8 lg:grid-cols-12 lg:gap-10 xl:max-w-[68rem]">
                <aside
                    class="relative hidden overflow-hidden rounded-[2rem] border border-secondary/38 bg-secondary text-white shadow-[0_42px_100px_-40px_rgb(0_53_86/0.45)] ring-1 ring-white/10 lg:col-span-5 lg:flex lg:flex-col lg:rounded-[2.25rem]"
                    aria-labelledby="auth-deck-title"
                >
                    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
                        <div
                            class="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_105%_-18%,rgb(239_76_79/0.36),transparent_58%)]"
                        />
                        <div
                            class="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_-14%_108%,rgb(56_189_248/0.11),transparent_55%)]"
                        />
                        <div
                            class="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgb(255_255_255/0.6)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.6)_1px,transparent_1px)] bg-[size:22px_22px]"
                        />
                    </div>

                    <div class="relative flex h-full flex-col justify-between px-10 py-10 xl:px-12 xl:py-12">
                        <div class="space-y-5">
                            <p class="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary/96">
                                Identity stack
                            </p>
                            <h2
                                id="auth-deck-title"
                                class="text-balance text-2xl font-bold leading-snug tracking-tight text-white xl:text-[1.625rem]"
                            >
                                {{ deckTitle }}
                            </h2>
                            <p class="text-[0.9rem] leading-relaxed text-slate-100/88">
                                {{
                                    mode === 'sign-in'
                                        ? 'Pick up your saved flow once we wire profile features — for now signing in confirms everything still works smoothly.'
                                        : 'Create credentials so upgrades like collections and synced filters have somewhere to land when we ship them.'
                                }}
                            </p>
                        </div>

                        <ul class="mt-10 space-y-3 border-t border-white/12 pt-8 text-[0.85rem] leading-relaxed text-slate-200/93">
                            <li
                                v-for="(line, idx) in bullets"
                                :key="idx"
                                class="relative ps-6 font-medium before:absolute before:left-0 before:top-[0.45rem] before:h-2 before:w-2 before:rounded-sm before:bg-primary before:shadow-[0_0_10px_-1px_rgb(239_76_79/0.75)] before:content-['']"
                            >
                                {{ line }}
                            </li>
                        </ul>
                    </div>
                </aside>

                <div class="relative flex flex-col lg:col-span-7 lg:justify-center">
                    <div
                        class="pointer-events-none absolute -right-[34%] -top-[52%] h-72 w-72 rounded-full bg-primary/12 blur-[95px]"
                        aria-hidden="true"
                    />

                    <div
                        class="relative overflow-hidden rounded-[1.85rem] border border-slate-200/[0.93] bg-white/[0.93] px-7 py-10 shadow-[0_36px_80px_-40px_rgb(0_53_86/0.28)] ring-1 ring-white/95 backdrop-blur-md sm:px-9 sm:py-11 md:rounded-[2rem]"
                    >
                        <div
                            class="pointer-events-none absolute -left-[42%] -top-[62%] h-64 w-64 rounded-full bg-secondary/[0.09] blur-[90px]"
                            aria-hidden="true"
                        />

                        <header class="relative mb-8 text-center sm:mb-10 sm:text-left">
                            <p
                                class="font-mono text-[0.625rem] font-bold uppercase tracking-[0.22em] text-primary"
                                style="font-variant-ligatures: none"
                            >
                                {{ mode === 'sign-in' ? 'Authenticate' : 'Onboard' }}
                            </p>
                            <h1 class="mt-2 text-2xl font-bold tracking-tight text-secondary md:text-[1.7rem]">
                                {{ title }}
                            </h1>
                            <p
                                v-if="$slots.intro"
                                class="mx-auto mt-3 max-w-xl text-[0.9rem] leading-relaxed text-slate-600 md:text-[0.9375rem] sm:mx-0"
                            >
                                <slot name="intro" />
                            </p>
                        </header>

                        <div class="relative">
                            <slot />
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    </section>
</template>
