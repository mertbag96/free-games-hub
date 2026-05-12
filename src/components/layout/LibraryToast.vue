<script setup>
import { TransitionGroup } from 'vue'
import { storeToRefs } from 'pinia'
import { useLibraryStore } from '@/stores/libraryStore.js'

const library = useLibraryStore()
const { libraryToasts } = storeToRefs(library)
</script>

<template>
    <Teleport to="body">
        <section
            aria-live="polite"
            aria-relevant="additions"
            aria-label="Library notifications"
            class="library-toast-host pointer-events-none fixed right-[max(1rem,env(safe-area-inset-right,1rem))] top-[calc(4.5rem+env(safe-area-inset-top,0px))] z-[200] flex max-w-[min(22rem,calc(100vw-2rem))] flex-col md:top-[calc(5.25rem+env(safe-area-inset-top,0px))]"
        >
            <TransitionGroup
                name="toast-stack"
                tag="div"
                class="relative flex w-full flex-col gap-3"
            >
                <aside
                    v-for="toast in libraryToasts"
                    :key="toast.id"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    class="w-full shrink-0 will-change-transform"
                >
                    <div
                        class="flex w-full max-w-full items-stretch gap-3 rounded-xl border border-slate-200/95 bg-white/98 px-4 py-[0.8125rem] shadow-[0_8px_30px_-8px_rgb(15_23_42/0.12),0_2px_8px_-4px_rgb(15_23_42/0.06)] ring-1 ring-slate-100/95 backdrop-blur-xl"
                    >
                        <span
                            class="w-[3px] shrink-0 self-stretch rounded-full bg-primary shadow-[0_0_12px_-2px_rgb(239_76_79/0.25)]"
                            aria-hidden="true"
                        />

                        <div class="flex min-w-0 flex-1 flex-col gap-1.5 py-[0.125rem]">
                            <p
                                class="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-slate-500"
                                aria-hidden="true"
                            >
                                Library
                            </p>
                            <p class="text-[0.875rem] font-semibold leading-snug tracking-tight text-secondary">
                                {{ toast.body }}
                            </p>
                        </div>
                    </div>
                </aside>
            </TransitionGroup>
        </section>
    </Teleport>
</template>

<style scoped>
.library-toast-host :deep(.toast-stack-move) {
    transition:
        transform 0.42s cubic-bezier(0.16, 1, 0.3, 1),
        opacity 0.32s ease;
}

.library-toast-host :deep(.toast-stack-enter-active),
.library-toast-host :deep(.toast-stack-leave-active) {
    transition:
        transform 0.42s cubic-bezier(0.16, 1, 0.3, 1),
        opacity 0.32s ease;
}

.library-toast-host :deep(.toast-stack-enter-from) {
    opacity: 0;
    transform: translateX(1rem) translateY(-0.5rem);
}

.library-toast-host :deep(.toast-stack-leave-to) {
    opacity: 0;
    transform: translateX(-0.75rem) scale(0.97);
}

.library-toast-host :deep(.toast-stack-leave-active) {
    position: absolute;
    right: 0;
    width: min(22rem, calc(100vw - 2rem));
}
</style>
