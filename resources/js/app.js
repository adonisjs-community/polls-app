import '../css/app.css'
import '@hotwired/turbo'
import Alpine from 'alpinejs'
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

Alpine.plugin(teleport)
Alpine.start()
window.Alpine = Alpine
