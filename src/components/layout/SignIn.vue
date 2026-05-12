<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import FormField from '@/components/ui/FormField.vue'
import UiButton from '@/components/ui/UiButton.vue'

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const signIn = () => {
    const auth = getAuth()

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
            router.push('/games')
        })
        .catch((error) => {
            console.error('Error signing in: ' + error)

            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage.value = 'Invalid email!'
                    break
                case 'auth/missing-password':
                    errorMessage.value = 'Password is required!'
                    break
                case 'auth/user-not-found':
                    errorMessage.value = 'No account with this email was found!'
                    break
                case 'auth/wrong-password':
                    errorMessage.value = 'Incorrect password!'
                    break
                default:
                    errorMessage.value = 'Incorrect credentials!'
                    break
            }
        })
}

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(getAuth(), provider)
        .then(() => {
            router.push('/games')
        })
        .catch((error) => {
            console.error('Error signing in with Google: ' + error)
        })
}
</script>

<template>
    <form class="relative flex w-full flex-col gap-6" autocomplete="off" @submit.prevent="signIn">
        <div class="space-y-5">
            <FormField
                id="signin-email"
                v-model="email"
                name="email"
                label="Email"
                type="email"
                autocomplete="username"
                placeholder="you@example.com"
            />
            <FormField
                id="signin-password"
                v-model="password"
                name="password"
                label="Password"
                type="password"
                autocomplete="current-password"
                placeholder="Your password"
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

        <UiButton type="submit" variant="primary" block>
            Sign in
        </UiButton>

        <div class="relative flex items-center gap-4 py-0.5" aria-hidden="true">
            <span class="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-slate-200" />
            <span class="shrink-0 font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-400">
                or
            </span>
            <span class="h-px flex-1 bg-gradient-to-l from-transparent via-slate-200 to-slate-200" />
        </div>

        <UiButton type="button" variant="outline" block @click="signInWithGoogle">
            <!-- Google "G" mark (Brand Resource Center simplified use) -->
            <svg xmlns="http://www.w3.org/2000/svg" class="size-5 shrink-0" viewBox="0 0 48 48" aria-hidden="true">
                <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.962 3.038l5.657-5.657C34.046 6.053 29.268 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.641-.236-3.273-.693-4.917z"
                />
                <path
                    fill="#FF3D00"
                    d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.962 3.038l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                />
                <path
                    fill="#4CAF50"
                    d="M24 44c5.166 0 9.946-2.015 13.594-5.297l-6.376-5.374C29.739 34.089 26.957 36 24 36c-5.217 0-9.613-3.349-11.354-8.084l-6.547 5.042C9.583 39.943 16.379 44 24 44z"
                />
                <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303a12.046 12.046 0 01-5.086 7.086l-.003-.004 6.376 5.374C43.068 39.069 44 37.086 44 24c0-1.657-.169-3.294-.489-4.917z"
                />
            </svg>
            <span>Continue with Google</span>
        </UiButton>

        <RouterLink
            to="/sign-up"
            class="text-center text-sm font-semibold text-secondary underline decoration-transparent underline-offset-4 outline-none ring-secondary/30 transition-colors hover:text-primary hover:decoration-primary focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-offset-2"
        >
            Need an account? Sign up
        </RouterLink>
    </form>
</template>
