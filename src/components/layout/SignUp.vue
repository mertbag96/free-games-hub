<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const signUp = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log('User was successfully signed up.')
            router.push('/games') // will redirect to "My Library/My Wish List" later
        })
        .catch((error) => {
            console.error('Error signing up user: ' + error)

            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage.value = 'Invalid email!'
                    break;
                case 'auth/missing-password':
                    errorMessage.value = 'Password is required!'
                    break;
                case 'auth/email-already-in-use':
                    errorMessage.value = 'Email already in use!'
                    break;
            }
        })
}
</script>

<template>
    <form 
        @submit.prevent="signUp"
        class="flex flex-col space-y-6 w-full"
        autocomplete="off">
        <!-- Email -->
        <div class="flex flex-col space-y-2">
            <!-- Label -->
            <label 
                class="text-sm text-black" 
                for="email"
            >
                Email
            </label>

            <!-- Input -->
            <input 
                v-model="email" 
                type="text" 
                name="email" 
                id="email" 
                placeholder="Please enter your email"
                class="outline-0 border-2 border-slate-200 rounded-lg p-2 focus:border-secondary text-sm"  
            />
        </div>

        <!-- Password -->
        <div class="flex flex-col space-y-2">
            <!-- Label -->
            <label 
                class="text-sm text-black" 
                for="password"
            >
                Password
            </label>

            <!-- Input -->
            <input 
                v-model="password" 
                type="password" 
                name="password" 
                id="password"
                minlength="6"
                placeholder="Please enter your password"
                class="outline-0 border-2 border-slate-200 rounded-lg p-2 focus:border-secondary text-sm"  
            />
        </div>

        <!-- Error Messages -->
        <div v-if="errorMessage">
            <p class="font-bold text-sm text-primary">
                {{ errorMessage }}
            </p>
        </div>

        <!-- Submit Button -->
        <button 
            type="submit" 
            class="bg-secondary rounded-lg py-2 font-semibold text-slate-50 hover:bg-sky-900 transition-colors duration-200"
        >
            Sign Up
        </button>

        <!-- Sign In Link -->
        <RouterLink
            to="/sign-in"
            class="text-secondary text-sm text-center underline"
        >
            Do you already have an account?
        </RouterLink>
    </form>
</template>