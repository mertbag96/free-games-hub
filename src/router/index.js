import HomeView from '@/views/HomeView.vue'
import GameView from '@/views/GameView.vue'
import GamesView from '@/views/GamesView.vue'
import PlatformsView from '@/views/PlatformsView.vue'
import CategoriesView from '@/views/CategoriesView.vue'
import LibraryView from '@/views/LibraryView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue'
import TermsOfUseView from '@/views/TermsOfUseView.vue'
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
        path: '/library',
        name: 'library',
        component: LibraryView,
    },
    {
        path: '/platforms',
        name: 'platforms',
        component: PlatformsView,
    },
    {
        path: '/categories',
        name: 'categories',
        component: CategoriesView,
    },
    {
        path: '/games/:id',
        name: 'game',
        component: GameView
    },
    {
        path: '/sign-in',
        name: 'sign-in',
        component: SignInView,
    },
    {
        path: '/sign-up',
        name: 'sign-up',
        component: SignUpView,
    },
    {
        path: '/privacy',
        name: 'privacy',
        component: PrivacyPolicyView,
    },
    {
        path: '/terms',
        name: 'terms',
        component: TermsOfUseView,
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