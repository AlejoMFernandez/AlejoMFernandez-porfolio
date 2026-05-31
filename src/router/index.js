import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeViewB from '../views/HomeViewB.vue'
import HomeViewC from '../views/HomeViewC.vue'
import ProjectView from '../views/ProjectView.vue'
import InfoView from '../views/InfoView.vue'
import ContactView from '../views/ContactView.vue'
import WorkView from '../views/WorkView.vue'
import { trackPageView } from '../services/analytics'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/home-b',
    name: 'home-b',
    component: HomeViewB
  },
  {
    path: '/home-c',
    name: 'home-c',
    component: HomeViewC
  },
  {
    path: '/proyecto/:id',
    name: 'project',
    component: ProjectView
  },
  {
    path: '/proyectos',
    name: 'work',
    component: WorkView
  },
  {
    path: '/info',
    name: 'info',
    component: InfoView
  },
  {
    path: '/contacto',
    name: 'contact',
    component: ContactView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

router.afterEach((to) => {
  trackPageView(to.fullPath)
})

export default router
