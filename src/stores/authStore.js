import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
    const auth = getAuth()
    const isSignedIn = ref(false)

    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            isSignedIn.value = !!user
        })
    })

    const handleSignOut = async () => {
        await signOut(auth)
        isSignedIn.value = false
    }

    return { isSignedIn, handleSignOut }
})
