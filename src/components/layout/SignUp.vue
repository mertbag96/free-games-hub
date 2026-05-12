<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import FormField from '@/components/ui/FormField.vue'
import UiButton from '@/components/ui/UiButton.vue'

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const signUp = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then(() => {
            router.push('/games')
        })
        .catch((error) => {
            console.error('Error signing up user: ' + error)

            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage.value = 'Invalid email!'
                    break
                case 'auth/missing-password':
                    errorMessage.value = 'Password is required!'
                    break
                case 'auth/email-already-in-use':
                    errorMessage.value = 'Email already in use!'
                    break
                default:
                    errorMessage.value = 'Could not create account. Try again.'
                    break
            }
        })
}
</script>

<template>
    <form class="relative flex w-full flex-col gap-6" autocomplete="off" @submit.prevent="signUp">
        <div class="space-y-5">
            <FormField
                id="signup-email"
                v-model="email"
                name="email"
                label="Email"
                type="email"
                autocomplete="username"
                placeholder="you@example.com"
            />
            <FormField
                id="signup-password"
                v-model="password"
                name="password"
                label="Password"
                type="password"
                autocomplete="new-password"
                placeholder="At least 6 characters"
                :minlength="6"
            />
        </div>

        <div
            v-if="errorMessage"
            class="rounded-xl border border-primary/30 bg-primary/[0.06] px-4 py-3 text-sm font-semibold text-secondary shadow-inner shadow-primary/5"
            role="alert"
        >
            {{ errorMessage }}
        </div>

        <UiButton type="submit" variant="secondary" block>
            Create account
        </UiButton>

        <RouterLink
            to="/sign-in"
            class="text-center text-sm font-semibold text-secondary underline decoration-transparent underline-offset-4 outline-none ring-secondary/30 transition-colors hover:text-primary hover:decoration-primary focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-offset-2"
        >
            Already registered? Sign in
        </RouterLink>
    </form>
</template>
