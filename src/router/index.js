import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [{
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/allPokemon',
    name: 'allPokemon',
    component: () => import('../views/allPokemon.vue')
  },
  {
    path: '/allPokemon/:id',
    name: 'single',
    component: () => import('../views/pokemon.vue'),
    props : true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router