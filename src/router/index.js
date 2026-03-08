import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectView from '../views/ProjectView.vue'
import InfoView from '../views/InfoView.vue'
import ContactView from '../views/ContactView.vue'
import WorkView from '../views/WorkView.vue'
import LabView from '../views/LabView.vue'
import LabProjectView from '../views/LabProjectView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
  {
    path: '/lab',
    name: 'lab',
    component: LabView
  },
  {
    path: '/lab/proyecto',
    name: 'lab-project',
    component: LabProjectView
  }
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

export default router
