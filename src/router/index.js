import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Starship from '../views/Starship.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/starship/:id',
    name: 'starship',
    component: Starship,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
