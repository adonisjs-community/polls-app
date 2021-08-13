import '../css/app.css'
import '@hotwired/turbo'
import Alpine from 'alpinejs'
import { listen } from 'quicklink'
import teleport from 'alpine-teleport'

Alpine.data('dialog', function () {
  return {
    opened: false,
    init() {},
    lastFocusedElement: null,
    open() {
      this.opened = true
      this.lastFocusedElement = document.activeElement

      this.$nextTick(() => {
        if (this.$refs.focusableItem) {
          this.$refs.focusableItem.focus()
        }
      })
    },
    close() {
      this.opened = false
      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus()
      }
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
Alpine.start()

document.addEventListener('turbo:load', () => {
  listen({
    el: document.querySelector('#sidebar'),
  })
})
