<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<template>
    <!-- Main -->
    <main class="bg-slate-50">
        <!-- Header -->
        <Header></Header>

        <!-- Page Content -->
        <RouterView class="min-h-page" />

        <!-- Footer -->
        <Footer></Footer>
    </main>
</template>
