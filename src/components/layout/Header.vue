<script setup>
import Link from '@/components/ui/link.vue'
import Logo from '@/components/layout/Logo.vue'
</script>

<template>
    <!-- Header -->
    <header class="border-b shadow bg-slate-50">
        <!-- Nav -->
        <nav class="max-w-7xl mx-auto py-4 flex items-center justify-between">
            <!-- Logo -->
            <Logo />

            <!-- Menu -->
            <div class="flex justify-between items-center space-x-2">
                <!-- Browse Games -->
                <Link url="/games" class="bg-secondary rounded-lg p-2 font-semibold text-sm text-slate-50 hover:bg-sky-900 transition-colors duration-200">
                    Browse Games
                </Link>

                <!-- Get Started -->
                <Link url="/login" class="bg-primary rounded-lg p-2 font-semibold text-sm text-slate-50 hover:bg-red-600 transition-colors duration-200">
                    Get Started
                </Link>
            </div>
        </nav>
    </header>
</template>