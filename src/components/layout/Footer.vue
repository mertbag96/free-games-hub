<script setup>
import Link from '@/components/ui/Link.vue'
import Logo from '@/components/layout/Logo.vue'
</script>

<template>
    <!-- Footer -->
    <footer class="border-t shadow bg-slate-50">
        <div class="max-w-7xl mx-auto py-4 flex items-center justify-between">
            <!-- Logo -->
            <Logo />

            <!-- API Attribution -->
            <div class="flex items-center space-x-1 text-sm">
                <span class="text-slate-700">
                    Data provided by
                </span>
                <Link 
                    url="https://freetogame.com/" 
                    class="font-semibold text-primary hover:text-secondary transition-colors duration-200" 
                    target="_blank"
                >
                FreeToGame
                </Link>
            </div>
        </div>
    </footer>
</template>