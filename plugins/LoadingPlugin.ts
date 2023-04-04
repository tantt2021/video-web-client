// LoadingPlugin.ts

import { Plugin } from '@nuxt/types'
import { onMounted, onUnmounted } from 'vue'

declare module '@nuxt/types' {
  interface Context {
    $loading: {
      show: () => void
      hide: () => void
    }
  }
}

const loadingPlugin: Plugin = ({ app }) => {
  let loadingInstance: any

  const showLoading = () => {
    loadingInstance = app.$loading.show()
  }

  const hideLoading = () => {
    loadingInstance?.hide()
  }

  onMounted(() => {
    app.router.beforeEach(showLoading)
    app.router.afterEach(hideLoading)
  })

  onUnmounted(() => {
    app.router.beforeEach(null)
    app.router.afterEach(null)
  })
}

export default loadingPlugin
