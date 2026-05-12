<script setup>
import { computed, reactive, watch } from 'vue'
import Card from '@/components/ui/Card.vue'
import LoadingState from '@/components/ui/LoadingState.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import PageContainer from '@/components/ui/PageContainer.vue'
import ButtonLink from '@/components/ui/ButtonLink.vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'
import { useLibraryStore } from '@/stores/libraryStore.js'

const authStore = useAuthStore()
const libraryStore = useLibraryStore()

const state = reactive({
    allGames: /** @type {any[]} */ ([]),
    loading: true,
})

async function loadCatalogue() {
    if (!libraryStore.userUid || !authStore.isSignedIn) {
        state.allGames = []
        state.loading = false
        return
    }
    state.loading = true
    try {
        const res = await fetch('/api/games')
        state.allGames = await res.json()
    } catch {
        state.allGames = []
    } finally {
        state.loading = false
    }
}

watch(
    () => [authStore.isSignedIn, libraryStore.userUid],
    () => loadCatalogue(),
    { immediate: true },
)

const savedGames = computed(() => {
    const map = new Map(state.allGames.map((g) => [String(g.id), g]))
    return libraryStore.gameIds.map((id) => map.get(id)).filter(Boolean)
})
</script>

<template>
    <PageContainer class="py-8 md:py-11">
        <SectionHeading
            title="My Library"
            :suffix="authStore.isSignedIn ? savedGames.length : 0"
        />

        <p class="mb-8 w-full text-sm leading-relaxed text-slate-600 md:text-[0.9375rem]">
            Save games while signed in—they stay on this device keyed to your Firebase account. Tap the bookmark on any game
            card to add or remove a title instantly.
            <RouterLink
                class="font-semibold text-primary underline-offset-4 hover:text-secondary hover:underline"
                to="/games"
            >
                Browse games
            </RouterLink>
            to grow your backlog.
        </p>

        <div
            v-if="!authStore.isSignedIn"
            class="rounded-2xl border border-dashed border-slate-300 bg-white/85 px-6 py-14 text-center"
        >
            <p class="text-base font-semibold text-secondary">Sign in to build a library.</p>
            <p class="mt-3 text-sm leading-relaxed text-slate-600">
                Bookmarks unlock after authentication so picks stay grouped with your account on this browser.
            </p>
            <div class="mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink variant="primary" to="/sign-in">Sign in</ButtonLink>
                <ButtonLink variant="outline" class="border-2" to="/sign-up">Create account</ButtonLink>
            </div>
        </div>

        <template v-else>
            <LoadingState v-if="state.loading" />

            <template v-else>
                <div
                    v-if="savedGames.length > 0"
                    class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    <Card v-for="game in savedGames" :key="game.id" :game="game" />
                </div>
                <p
                    v-else
                    class="rounded-2xl border border-dashed border-slate-300 bg-white/65 px-4 py-14 text-center text-sm font-semibold leading-relaxed text-slate-500"
                >
                    Nothing saved yet — hit the ribbon on any catalogue card once you're signed in.
                </p>
            </template>
        </template>
    </PageContainer>
</template>
