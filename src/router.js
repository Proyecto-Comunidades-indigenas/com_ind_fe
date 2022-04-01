import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

import Inicio               from './components/Inicio.vue'
import Login                from './components/Login.vue'
import Registrate           from './components/Registrate.vue'
import Cuenta               from './components/Cuenta.vue'
import CreacionProducto     from './components/CreacionProducto.vue'
import ListaProductos       from './components/ListaProductos.vue'
import EliminarProducto     from './components/EliminarProducto.vue'
import ActualizarProducto   from './components/ActualizarProducto.vue'

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
  },
  {
    path: '/user/cuenta',
    name: 'cuenta',
    component: Cuenta
  },
  {
    path: '/producto/creacionProducto',
    name: 'creacionProducto',
    component: CreacionProducto
  },
  {
    path: '/producto/listaProductos',
    name: 'listaProductos',
    component: ListaProductos
  },
  {
    path: '/producto/eliminarProducto',
    name: 'eliminarProducto',
    component: EliminarProducto
  },
  {
    path: '/producto/actualizarProducto',
    name: 'actualizarProducto',
    component: ActualizarProducto
  },
  

]; 

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
