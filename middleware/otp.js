export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const email = localStorage.getItem('email')
    const otpVerified = localStorage.getItem('otp_verified') === 'true'

    // If no email stored (not logged in), block OTP page
    if (!email && to.path === '/verify-otp') {
      return navigateTo('/login')
    }

    // If OTP already verified, block OTP page too
    if (otpVerified && to.path === '/verify-otp') {
      return navigateTo('/profile')
    }
  }
})
