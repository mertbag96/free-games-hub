<script setup>
import { ref, computed } from 'vue'
import PageContainer from '@/components/ui/PageContainer.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import FormField from '@/components/ui/FormField.vue'
import { RouterLink } from 'vue-router'
import { GAME_CATEGORIES } from '@/data/gameFilters.js'
import { Squares2X2Icon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const categorySearch = ref('')

const visibleCategories = computed(() => {
    const q = categorySearch.value.trim().toLowerCase()
    if (!q) return GAME_CATEGORIES

    return GAME_CATEGORIES.filter(
        (c) =>
            c.label.toLowerCase().includes(q) ||
            c.value.toLowerCase().includes(q) ||
            c.value.replace(/-/g, ' ').toLowerCase().includes(q),
    )
})
</script>

<template>
    <PageContainer class="py-8 md:py-10">
        <SectionHeading title="Browse by category" :suffix="visibleCategories.length" />

        <p class="mb-6 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-[0.9375rem]">
            Pick a genre to open the
            <RouterLink class="font-semibold text-primary underline-offset-4 hover:text-secondary hover:underline" to="/games">
                all games list
            </RouterLink>
            with that category pre-selected. Labels match what you'll see on the Browse page filters.
        </p>

        <section
            class="relative mb-11 overflow-hidden rounded-[1.6rem] border border-slate-200/92 bg-white/93 p-6 shadow-[0_26px_50px_-32px_rgb(0_53_86/0.28)] ring-1 ring-white/90 backdrop-blur-md sm:p-8"
            aria-label="Quick category finder"
        >
            <div
                class="pointer-events-none absolute -right-[15%] -top-[40%] h-72 w-72 rounded-full bg-primary/15 blur-[100px]"
                aria-hidden="true"
            />

            <div class="relative w-full space-y-4">
                <FormField
                    id="categories-search"
                    v-model="categorySearch"
                    name="categories-search"
                    variant="filter"
                    label="Spot a category instantly"
                    type="search"
                    placeholder="Type a label or slug snippet..."
                    autocomplete="off"
                >
                    <template #prefix>
                        <MagnifyingGlassIcon class="size-[1.3rem]" />
                    </template>
                </FormField>

                <p
                    v-if="categorySearch.trim()"
                    class="text-xs font-medium leading-relaxed text-slate-500"
                    role="status"
                    aria-live="polite"
                >
                    Showing {{ visibleCategories.length }}
                    {{ visibleCategories.length === 1 ? 'category' : 'categories' }}. Clear the box to expose all
                    {{ GAME_CATEGORIES.length }} presets.
                </p>
                <p v-else class="text-xs leading-relaxed text-slate-500">
                    {{ GAME_CATEGORIES.length }} presets below mirror the selectors on Browse games.
                </p>
            </div>
        </section>

        <div v-if="visibleCategories.length > 0" id="categories-list">
            <ul class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <li v-for="cat in visibleCategories" :key="cat.value">
                    <RouterLink
                        :to="{ name: 'games', query: { category: cat.value } }"
                        class="group flex items-center gap-3 rounded-2xl border border-slate-200/95 bg-white p-4 text-secondary shadow-[0_1px_3px_rgb(15_23_42/0.06)] ring-1 ring-slate-100 transition-[transform,box-shadow,border-color] hover:border-primary/35 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        :aria-label="`Browse ${cat.label} games`"
                    >
                        <span
                            class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary/8 text-secondary transition-colors group-hover:bg-primary group-hover:text-white"
                        >
                            <Squares2X2Icon class="size-[1.35rem]" aria-hidden="true" />
                        </span>
                        <span class="min-w-0 truncate text-sm font-semibold">{{ cat.label }}</span>
                        <span
                            class="ms-auto shrink-0 text-xs font-semibold uppercase tracking-wide text-primary opacity-70 group-hover:opacity-100"
                            aria-hidden="true"
                        >
                            Browse
                        </span>
                    </RouterLink>
                </li>
            </ul>
        </div>

        <div
            v-else-if="categorySearch.trim()"
            id="categories-list"
            class="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center text-sm font-medium text-slate-600"
            role="status"
        >
            No categories match &quot;{{ categorySearch.trim() }}&quot;. Try a shorter or different spelling.
        </div>
    </PageContainer>
</template>
