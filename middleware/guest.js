export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const email = localStorage.getItem('email')
    const otpVerified = localStorage.getItem('otp_verified') === 'true'

    if (email && otpVerified) {
      return navigateTo('/profile')
    }
  }
})
