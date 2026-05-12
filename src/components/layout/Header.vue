<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Logo from '@/components/layout/Logo.vue'
import ButtonLink from '@/components/ui/ButtonLink.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'
import { MagnifyingGlassIcon, ArrowLeftStartOnRectangleIcon, Bars3Icon } from '@heroicons/vue/24/solid'
import UiButton from '@/components/ui/UiButton.vue'

const router = useRouter()
const authStore = useAuthStore()

const menuOpen = ref(false)
const mobileMenuRoot = ref(null)

let mq = /** @type {MediaQueryList | null} */ (null)

const menuId = 'header-nav-menu'

const signOut = async () => {
    menuOpen.value = false
    await authStore.handleSignOut()
    router.push('/')
}

const closeMenu = () => {
    menuOpen.value = false
}

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
}

const onDocumentPointerDown = (event) => {
    const root = mobileMenuRoot.value
    const target = event.target
    if (!root || !(target instanceof Node) || root.contains(target)) return
    closeMenu()
}

const onEscape = (event) => {
    if (event.key !== 'Escape') return
    closeMenu()
}

const syncMenuWithBreakpoint = () => {
    if (mq?.matches) {
        menuOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('pointerdown', onDocumentPointerDown, true)
    document.addEventListener('keydown', onEscape)
    mq = window.matchMedia('(min-width: 768px)')
    syncMenuWithBreakpoint()
    mq.addEventListener('change', syncMenuWithBreakpoint)
})

onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', onDocumentPointerDown, true)
    document.removeEventListener('keydown', onEscape)
    mq?.removeEventListener('change', syncMenuWithBreakpoint)
})
</script>

<template>
    <header
        class="sticky top-0 z-40 border-b border-slate-200/90 bg-white/85 shadow-sm backdrop-blur-md transition-[background-color,box-shadow,backdrop-filter,border-color]"
        :class="menuOpen ? 'border-transparent bg-white shadow-none backdrop-blur-none' : ''"
    >
        <nav
            class="mx-auto flex h-14 max-w-7xl flex-nowrap items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
            aria-label="Main"
        >
            <Logo class="min-w-0 shrink overflow-hidden py-2" />

            <!-- md+: inline browse + account -->
            <div class="hidden shrink-0 flex-nowrap items-center gap-2 sm:gap-2.5 md:flex">
                <ButtonLink
                    to="/platforms"
                    variant="ghost"
                    class="hidden shrink-0 whitespace-nowrap !px-3 !py-2 text-sm md:inline-flex"
                    aria-label="Browse game platforms"
                >
                    Platforms
                </ButtonLink>

                <ButtonLink
                    to="/categories"
                    variant="ghost"
                    class="hidden shrink-0 whitespace-nowrap !px-3 !py-2 text-sm md:inline-flex"
                    aria-label="Browse game categories"
                >
                    Categories
                </ButtonLink>

                <ButtonLink
                    to="/library"
                    variant="ghost"
                    class="hidden shrink-0 whitespace-nowrap !px-3 !py-2 text-sm md:inline-flex"
                    aria-label="Open my game library"
                >
                    My Library
                </ButtonLink>

                <ButtonLink
                    to="/games"
                    variant="secondary"
                    class="shrink gap-2 whitespace-nowrap !rounded-xl !py-2 !pl-3 !pr-3 text-sm sm:!py-2.5 sm:!pl-4 sm:!pr-4"
                    aria-label="Browse games"
                >
                    <MagnifyingGlassIcon class="size-5 shrink-0 sm:size-[1.35rem]" aria-hidden="true" />
                    <span>Browse Games</span>
                </ButtonLink>

                <ButtonLink
                    v-if="!authStore.isSignedIn"
                    to="/sign-in"
                    variant="primary"
                    class="whitespace-nowrap !px-3 sm:!px-4"
                >
                    Get Started
                </ButtonLink>
                <UiButton
                    v-else
                    variant="primary"
                    class="!gap-2 !whitespace-nowrap !px-3 sm:!px-4"
                    aria-label="Sign out"
                    @click="signOut"
                >
                    <ArrowLeftStartOnRectangleIcon class="size-5" aria-hidden="true" />
                    <span>Sign Out</span>
                </UiButton>
            </div>

            <!-- Mobile: hamburger opens a full-viewport-width panel below the header -->
            <div ref="mobileMenuRoot" class="relative z-50 shrink-0 md:hidden">
                <button
                    type="button"
                    class="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-secondary shadow-sm outline-none ring-secondary/40 transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-offset-2"
                    :aria-expanded="menuOpen"
                    :aria-controls="menuOpen ? menuId : undefined"
                    aria-haspopup="true"
                    aria-label="Open navigation menu"
                    @click="toggleMenu"
                >
                    <Bars3Icon class="size-6" aria-hidden="true" />
                </button>

                <transition
                    enter-active-class="transition duration-150 ease-out"
                    enter-from-class="translate-y-1 opacity-0"
                    enter-to-class="translate-y-0 opacity-100"
                    leave-active-class="transition duration-100 ease-in"
                    leave-from-class="translate-y-0 opacity-100"
                    leave-to-class="translate-y-1 opacity-0"
                >
                    <div
                        v-show="menuOpen"
                        :id="menuId"
                        class="fixed inset-x-0 top-14 z-[100] flex w-full max-w-none flex-col gap-2 rounded-b-2xl border-x-0 border-b border-slate-200/90 bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] shadow-none sm:px-6"
                        role="menu"
                    >
                        <ButtonLink
                            to="/platforms"
                            variant="ghost"
                            role="menuitem"
                            aria-label="Browse platforms"
                            class="flex !w-full justify-center whitespace-nowrap !rounded-xl !px-4 !py-3"
                            @click="closeMenu"
                        >
                            Platforms
                        </ButtonLink>

                        <ButtonLink
                            to="/categories"
                            variant="ghost"
                            role="menuitem"
                            aria-label="Browse categories"
                            class="flex !w-full justify-center whitespace-nowrap !rounded-xl !px-4 !py-3"
                            @click="closeMenu"
                        >
                            Categories
                        </ButtonLink>

                        <ButtonLink
                            to="/library"
                            variant="ghost"
                            role="menuitem"
                            aria-label="My library"
                            class="flex !w-full justify-center whitespace-nowrap !rounded-xl !px-4 !py-3"
                            @click="closeMenu"
                        >
                            My Library
                        </ButtonLink>

                        <ButtonLink
                            to="/games"
                            variant="secondary"
                            role="menuitem"
                            aria-label="Browse games"
                            class="flex !w-full justify-center gap-2 whitespace-nowrap !rounded-xl !px-4 !py-3"
                            @click="closeMenu"
                        >
                            <MagnifyingGlassIcon class="size-5 shrink-0" aria-hidden="true" />
                            <span>Browse Games</span>
                        </ButtonLink>

                        <ButtonLink
                            v-if="!authStore.isSignedIn"
                            to="/sign-in"
                            variant="primary"
                            role="menuitem"
                            class="flex !w-full justify-center whitespace-nowrap !rounded-xl !px-4 !py-3"
                            @click="closeMenu"
                        >
                            Get Started
                        </ButtonLink>

                        <UiButton
                            v-else
                            variant="primary"
                            role="menuitem"
                            class="w-full justify-center whitespace-nowrap !rounded-xl !py-3"
                            aria-label="Sign out"
                            @click="signOut"
                        >
                            <ArrowLeftStartOnRectangleIcon class="size-5" aria-hidden="true" />
                            Sign Out
                        </UiButton>
                    </div>
                </transition>
            </div>
        </nav>
    </header>
</template>
