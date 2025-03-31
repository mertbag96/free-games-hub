import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GameView from '@/views/GameView.vue'
import GamesView from '@/views/GamesView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

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
    },
    {
        path: '/games/:id',
        name: 'game',
        component: GameView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;