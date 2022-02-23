import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

import Inicio      from './components/Inicio.vue'
import Login      from './components/Login.vue'
import Registrate from './components/Registrate.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: App
  },
  {
    path: '/user/inicio',
    name: 'inicio',
    component: Inicio
  },
  {
    path: '/user/login',
    name: 'logIn',
    component: Login
  },
  {
    path: '/user/registrate',
    name: 'registrate',
    component: Registrate
  }

]; 

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
