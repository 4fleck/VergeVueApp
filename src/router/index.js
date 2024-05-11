import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/:catchAll(.*)',
        name: "404",
        component: () => import('../views/404.vue'),
      },
      {
        path: "/",
        name: "Home",
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: "/about",
        name: "About",
        component: () => import('../views/AboutView.vue'),
      },
      {
        path: "/doc",
        name: "Doc",
        component: () => import('../views/DocView.vue'),
      }
    ]
  })
  
  export default router
  