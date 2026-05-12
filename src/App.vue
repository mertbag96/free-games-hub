<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import CookieConsent from '@/components/layout/CookieConsent.vue'
import LibraryToast from '@/components/layout/LibraryToast.vue'
</script>

<template>
    <div class="flex min-h-dvh flex-col bg-slate-50 text-slate-900">
        <Header />
        <main class="relative flex flex-1 flex-col">
            <RouterView />
        </main>
        <Footer class="mt-auto" />
        <CookieConsent />
        <LibraryToast />
    </div>
</template>
