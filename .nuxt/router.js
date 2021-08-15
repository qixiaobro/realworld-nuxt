import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5059bd40 = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _52f57716 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _0b48dada = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _aa2feb5a = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _435950b9 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _448ae383 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _dc9b64c0 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _5059bd40,
    children: [{
      path: "",
      component: _52f57716,
      name: "home"
    }, {
      path: "/login",
      component: _0b48dada,
      name: "login"
    }, {
      path: "/register",
      component: _0b48dada,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _aa2feb5a,
      name: "profile"
    }, {
      path: "/settings",
      component: _435950b9,
      name: "settings"
    }, {
      path: "/editor",
      component: _448ae383,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _dc9b64c0,
      name: "article"
    }]
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
