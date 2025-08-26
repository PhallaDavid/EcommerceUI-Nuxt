// plugins/message.js
import mitt from 'mitt'

const emitter = mitt()

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('message', {
    success(msg) {
      emitter.emit('message', { type: 'success', text: msg })
    },
    error(msg) {
      emitter.emit('message', { type: 'error', text: msg })
    },
  })
  nuxtApp.provide('messageBus', emitter)
})
