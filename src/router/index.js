import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: () =>
                import ('../views/HomeView.vue')
        },
        {
            path: '/city/:name',
            name: 'city',
            component: () =>
                import ('../views/GetCityView.vue')
        },
        {
            path: '/search',
            name: 'search',
            component: () =>
                import ('../views/SearchView.vue')
        },
        {
            path: '/location',
            name: 'location',
            component: () =>
                import ('../views/LocationView.vue')
        }
    ]
})

export default router