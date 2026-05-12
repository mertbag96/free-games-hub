<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import UiButton from '@/components/ui/UiButton.vue'
import { getConsentSnapshot, persistConsent } from '@/lib/consentCookies.js'

const ready = ref(false)
const showBanner = ref(false)
const optionalEnabled = ref(false)

onMounted(() => {
    const existing = getConsentSnapshot()
    showBanner.value = !existing
    if (existing) {
        optionalEnabled.value = Boolean(existing.optional)
    }
    ready.value = true
})

function acceptNecessaryOnly() {
    optionalEnabled.value = false
    persistConsent(false)
    showBanner.value = false
}

function acceptAll() {
    optionalEnabled.value = true
    persistConsent(true)
    showBanner.value = false
}

function saveChoice() {
    persistConsent(Boolean(optionalEnabled.value))
    showBanner.value = false
}
</script>

<template>
    <Teleport to="body">
        <transition
            enter-active-class="transition duration-200 ease-out"
            leave-active-class="transition duration-200 ease-in"
            enter-from-class="translate-y-2 opacity-0"
            leave-to-class="translate-y-2 opacity-0"
        >
            <aside
                v-if="ready && showBanner"
                class="cookie-consent-shell fixed bottom-4 left-4 z-[160] max-h-[min(85vh,560px)] w-[min(32rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200/95 bg-white/98 p-5 shadow-[0_22px_50px_-20px_rgb(0_53_86/0.45)] ring-1 ring-slate-200/90 backdrop-blur-md sm:p-6 md:left-6 md:bottom-6"
                role="dialog"
                aria-labelledby="cookie-consent-heading"
                aria-describedby="cookie-consent-desc"
            >
                <div class="flex flex-col gap-5 pb-[max(0.25rem,env(safe-area-inset-bottom,0px))]">
                    <div>
                        <p class="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-primary">Cookies</p>
                        <h2 id="cookie-consent-heading" class="mt-1.5 text-lg font-bold leading-snug text-secondary md:text-xl">
                            Control how we remember your preferences
                        </h2>
                        <p id="cookie-consent-desc" class="mt-2 text-sm leading-relaxed text-slate-600 md:text-[0.9375rem]">
                            We use strictly necessary storage to keep the session secure and recall this banner choice. Optional analytics help guide future improvements anonymously.
                            <RouterLink
                                class="ms-1 font-semibold text-primary underline decoration-transparent underline-offset-2 hover:text-secondary hover:underline"
                                to="/privacy"
                            >
                                Privacy Policy
                            </RouterLink>
                        </p>
                    </div>

                    <div class="space-y-4 rounded-xl border border-slate-200/95 bg-slate-50/80 p-4">
                        <div>
                            <div class="flex flex-wrap items-baseline gap-2">
                                <h3 class="text-[0.8rem] font-semibold uppercase tracking-wide text-secondary">Necessary cookies</h3>
                                <span class="rounded-full bg-secondary/95 px-2 py-px text-[0.65rem] font-bold uppercase tracking-wider text-white">
                                    Always on
                                </span>
                            </div>
                            <p class="mt-1.5 text-xs leading-relaxed text-slate-600">
                                Required for remembering consent state, guarding forms, signing you out safely when requested, and
                                basic fault prevention. These cannot be disabled without breaking reliability.
                            </p>
                        </div>
                        <div class="border-t border-slate-200/95 pt-4">
                            <label
                                class="cookie-option flex cursor-pointer items-start gap-3 rounded-lg p-2 outline-none hover:bg-white/65 sm:items-center sm:p-3"
                                for="cookie-optional-consent"
                            >
                                <input
                                    id="cookie-optional-consent"
                                    v-model="optionalEnabled"
                                    type="checkbox"
                                    class="cookie-checkbox mt-1 size-[1.1rem] shrink-0 cursor-pointer rounded border-slate-300 shadow-sm outline-none ring-offset-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:mt-0"
                                />
                                <span class="min-w-0">
                                    <span class="font-semibold text-secondary">Optional analytics cookies</span>
                                    <span class="mt-0.5 block text-xs leading-relaxed text-slate-600">
                                        Helps diagnose traffic anonymously. Turning this off keeps tracking minimal. Reset your
                                        choice anytime by deleting site storage for Free Games Hub in your browser settings.
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
                        <UiButton
                            type="button"
                            variant="outline"
                            class="order-3 w-full sm:order-1 sm:!grow-0 sm:w-auto"
                            @click="acceptNecessaryOnly"
                        >
                            Necessary only
                        </UiButton>
                        <UiButton
                            type="button"
                            variant="secondary"
                            class="order-2 w-full sm:order-2 sm:!grow-0 sm:w-auto"
                            @click="saveChoice"
                        >
                            Save preference
                        </UiButton>
                        <UiButton
                            type="button"
                            variant="primary"
                            class="order-1 w-full sm:order-3 sm:!grow-0 sm:w-auto"
                            @click="acceptAll"
                        >
                            Accept all cookies
                        </UiButton>
                    </div>
                </div>
            </aside>
        </transition>
    </Teleport>
</template>

<style scoped>
.cookie-checkbox {
    accent-color: #003556;
}

.cookie-consent-shell {
    scroll-padding-block-end: calc(4rem + env(safe-area-inset-bottom, 0px));
}
</style>
