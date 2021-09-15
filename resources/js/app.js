import '../css/app.css'

import '@hotwired/turbo'
import Alpine from 'alpinejs'
import trap from '@alpinejs/trap'
import teleport from 'alpine-teleport'

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
