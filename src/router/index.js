import HomeView from '@/views/HomeView.vue'
import GameView from '@/views/GameView.vue'
import GamesView from '@/views/GamesView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/games',
        name: 'games',
        component: GamesView
        /*
        meta: {
            requiresAuth: true
        }
        */
    },
    {
        path: '/games/:id',
        name: 'game',
        component: GameView
    },
    {
        path: '/sign-in',
        name: 'sign-in',
        component: SignInView
    },
    {
        path: '/sign-up',
        name: 'sign-up',
        component: SignUpView
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener()
                resolve(user)
            },
            reject
        )
    })
}

router.beforeEach(async (to, from, next) => {
    const user = await getCurrentUser()

    if ((to.path === '/sign-in' || to.path === '/sign-up') && user) {
        next('/')
    } else if (to.matched.some((record) => record.meta.requiresAuth) && !user) {
        next('/')
    } else {
        next()
    }
})

export default router;