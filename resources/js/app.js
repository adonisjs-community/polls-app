import 'unpoly'
import Alpine from 'alpinejs'
import trap from '@alpinejs/trap'
import teleport from 'alpine-teleport'

import 'unpoly/unpoly.css'
import '../css/app.css'

/**
 * Main directives for navigating between pages
 */
up.fragment.config.mainTargets.push('[layout-root]')
up.fragment.config.mainTargets.push('[layout-body]')
up.fragment.config.mainTargets.push('[layout-main]')

up.on('up:fragment:loaded', (event) => {
  let fullReload = event.response.getHeader('X-Full-Reload')

  if (fullReload) {
    // Prevent the fragment update and don't update browser history
    event.preventDefault()

    // Make a full page load for the same request.
    event.request.loadPage()
  }
})

/**
 * Alpine components
 */
Alpine.data('dialog', function () {
  return {
    opened: false,
    open() {
      this.opened = true
    },
    close() {
      this.opened = false
    },
  }
})

Alpine.data('notification', function (options) {
  return {
    visible: options.autoClose === true ? false : true,
    autoClose: !!options.autoClose,
    init() {
      if (this.autoClose) {
        setTimeout(() => {
          this.visible = true
        }, 1000)
        setTimeout(() => {
          this.visible = false
        }, 6000)
      }
    },
  }
})

Alpine.plugin(teleport)
Alpine.plugin(trap)
Alpine.start()
