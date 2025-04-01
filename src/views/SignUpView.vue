<script setup>
import SignUp from '@/components/layout/SignUp.vue'
</script>

<template>
    <!-- Sign Up -->
    <section class="max-w-[92%] min-h-page md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto p-12 flex flex-col justify-center items-center space-y-8">
        <div class="bg-slate-100 border-2 border-slate-200 shadow-sm rounded-lg p-8 w-1/3">
            <!-- Title -->
            <h1 class="font-semibold text-secondary text-xl text-center mb-6">
                Sign Up
            </h1>

            <!-- Form -->
            <SignUp />
        </div>
    </section>
</template>