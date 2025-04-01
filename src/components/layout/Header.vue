<script setup>
import Logo from '@/components/layout/Logo.vue'
import {RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/vue/24/solid'

const router = useRouter()
const authStore = useAuthStore()

const signOut = async () => {
    await authStore.handleSignOut()
    router.push('/')
}
</script>

<template>
    <!-- Header -->
    <header class="border-b shadow bg-slate-50">
        <!-- Nav -->
        <nav class="max-w-7xl mx-auto py-4 flex items-center justify-between">
            <!-- Logo -->
            <Logo />

            <!-- Menu -->
            <div class="flex justify-between items-center space-x-4">
                <!-- Search -->
                <RouterLink
                    to="/games"
                >
                    <MagnifyingGlassIcon class="size-7 text-secondary" />
                </RouterLink>

                <!-- Browse Games -->
                <RouterLink 
                    to="/games" 
                    class="bg-secondary rounded-lg p-2 font-semibold text-sm text-slate-50 hover:bg-sky-900 transition-colors duration-200"
                >
                    Browse Games
                </RouterLink>

                <!-- Get Started -->
                <RouterLink 
                    v-if="!authStore.isSignedIn"
                    to="/sign-in" 
                    class="bg-primary rounded-lg p-2 font-semibold text-sm text-slate-50 hover:bg-red-600 transition-colors duration-200"
                >
                    Get Started
                </RouterLink>

                <!-- Log Out -->
                <button 
                    v-if="authStore.isSignedIn"
                    @click="signOut" 
                    class="flex items-center space-x-1 bg-primary rounded-lg p-2 font-semibold text-sm text-slate-50 hover:bg-red-600 transition-colors duration-200"
                >
                    <ArrowLeftStartOnRectangleIcon class="size-5 text-slate-50" />
                    <span>Sign Out</span>
                </button>
            </div>
        </nav>
    </header>
</template>