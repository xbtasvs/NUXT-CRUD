import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _67a3666e = () => interopDefault(import('..\\pages\\articles\\index.vue' /* webpackChunkName: "pages/articles/index" */))
const _4d5867bd = () => interopDefault(import('..\\pages\\articles\\add.vue' /* webpackChunkName: "pages/articles/add" */))
const _4a61b892 = () => interopDefault(import('..\\pages\\user\\login.vue' /* webpackChunkName: "pages/user/login" */))
const _67b348a8 = () => interopDefault(import('..\\pages\\user\\logout.vue' /* webpackChunkName: "pages/user/logout" */))
const _808721a4 = () => interopDefault(import('..\\pages\\user\\my-account.vue' /* webpackChunkName: "pages/user/my-account" */))
const _65437476 = () => interopDefault(import('..\\pages\\user\\register.vue' /* webpackChunkName: "pages/user/register" */))
const _9dcc8928 = () => interopDefault(import('..\\pages\\articles\\_id\\index.vue' /* webpackChunkName: "pages/articles/_id/index" */))
const _3691e61f = () => interopDefault(import('..\\pages\\articles\\_id\\update.vue' /* webpackChunkName: "pages/articles/_id/update" */))
const _2ef9e18b = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/articles",
    component: _67a3666e,
    name: "articles"
  }, {
    path: "/articles/add",
    component: _4d5867bd,
    name: "articles-add"
  }, {
    path: "/user/login",
    component: _4a61b892,
    name: "user-login"
  }, {
    path: "/user/logout",
    component: _67b348a8,
    name: "user-logout"
  }, {
    path: "/user/my-account",
    component: _808721a4,
    name: "user-my-account"
  }, {
    path: "/user/register",
    component: _65437476,
    name: "user-register"
  }, {
    path: "/articles/:id",
    component: _9dcc8928,
    name: "articles-id"
  }, {
    path: "/articles/:id/update",
    component: _3691e61f,
    name: "articles-id-update"
  }, {
    path: "/",
    component: _2ef9e18b,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
