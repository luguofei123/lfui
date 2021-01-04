import Vue from 'vue'
import VueRouter from 'vue-router'
import { documentRoutes } from './document.js'

Vue.use(VueRouter)

const routes = [
  ...documentRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
