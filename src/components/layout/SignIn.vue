<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { 
    getAuth, 
    signInWithEmailAndPassword,
    GoogleAuthProvider, 
    signInWithPopup 
} from 'firebase/auth'

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const signIn = () => {
    const auth = getAuth()

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log('User was successfully signed in.')

            console.log(auth.currentUser)

            router.push('/games') // will redirect to "My Library/My Wish List" later
        })
        .catch((error) => {
            console.error('Error signing in: ' + error)
            
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage.value = 'Invalid email!'
                    break;
                case 'auth/missing-password':
                    errorMessage.value = 'Password is required!'
                case 'auth/user-not-found':
                    errorMessage.value = 'No account with this email was found!'
                    break;
                case 'auth/wrong-password':
                    errorMessage.value = 'Incorrect password!'
                    break;
                default:
                    errorMessage.value = 'Incorrect credentials!'
                    break;
            }
        })
}

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user)
            router.push('/games') // will redirect to "My Library/My Wish List" later
        })
        .catch((error) => {
            console.error('Error signing in with Google: ' + error)
        })
}
</script>

<template>
    <form 
        @submit.prevent="signIn"
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
            Sign In
        </button>

        <!-- Sign In with Google Button -->
        <button 
            type="button"
            @click="signInWithGoogle"
            class="bg-primary rounded-lg py-2 font-semibold text-slate-50 hover:bg-red-600 transition-colors duration-200"
        >
            Sign In with Google
        </button>

        <!-- Sign Up Link -->
        <RouterLink
            to="/sign-up"
            class="text-secondary text-sm text-center underline"
        >
            Don't you have an account?
        </RouterLink>
    </form>
</template>