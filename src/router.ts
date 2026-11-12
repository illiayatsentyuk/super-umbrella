import { createRouter, createWebHashHistory } from 'vue-router'
import { findWorld } from './data/worlds'
import AtelierPage from './pages/AtelierPage.vue'
import HomePage from './pages/HomePage.vue'
import ManifestPage from './pages/ManifestPage.vue'
import WorldPage from './pages/WorldPage.vue'
import WorldsPage from './pages/WorldsPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { title: 'Мікс світів. Поєднай непоєднуване' },
    },
    {
      path: '/svity',
      name: 'worlds',
      component: WorldsPage,
      meta: { title: 'Світи' },
    },
    {
      path: '/svity/:id',
      name: 'world',
      component: WorldPage,
      meta: { title: 'Світ' },
    },
    {
      path: '/verstat',
      name: 'atelier',
      component: AtelierPage,
      meta: { title: 'Верстат' },
    },
    {
      path: '/manifest',
      name: 'manifest',
      component: ManifestPage,
      meta: { title: 'Маніфест' },
    },
  ],
})

router.afterEach((to) => {
  if (to.name === 'home') {
    document.title = 'Мікс світів. Поєднай непоєднуване'
    return
  }

  if (to.name === 'world' && typeof to.params.id === 'string') {
    const world = findWorld(to.params.id)
    document.title = world ? `${world.title}, Мікс світів` : 'Світ, Мікс світів'
    return
  }

  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Мікс світів'
  document.title = `${title}, Мікс світів`
})

export default router
