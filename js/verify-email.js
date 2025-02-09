/**
 * Handle email verification on WordPress
 * This code should be loaded on your verification page
 */

;(function ($) {
  'use strict'

  $(function () {
    console.log('Frontend - Verify Email')

    const waitForFirebase = setInterval(() => {
      if (typeof firebase !== 'undefined' && firebase.apps.length) {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search)
        const mode = urlParams.get('mode')
        const actionCode = urlParams.get('oobCode')
        const lang = urlParams.get('lang')
        const continueUrl = urlParams.get('continueUrl')

        console.log('Verification params:', {
          mode,
          actionCode,
          lang,
          continueUrl,
        })

        // Only proceed if this is an email verification request
        if (mode === 'verifyEmail' && actionCode) {
          handleEmailVerification(actionCode, continueUrl)
        } else {
          const statusElement = document.getElementById('verification-status')
          if (statusElement) {
            statusElement.textContent = 'Invalid verification link'
          }
        }
      }
      clearInterval(waitForFirebase)
    }, 1000)
  })

  async function handleEmailVerification(actionCode, continueUrl) {
    const statusElement = document.getElementById('verification-status')
    if (!statusElement) return

    try {
      statusElement.textContent = 'Verifying your email...'

      // Get Firebase auth instance
      const auth = firebase.auth()

      // Apply the verification code
      await auth.applyActionCode(actionCode)

      // Update the UI
      statusElement.textContent = 'Email verified successfully! Redirecting...'

      // Optional: Refresh the current user if logged in
      const user = auth.currentUser
      if (user) {
        await user.reload()
      }

      // Redirect after successful verification
      setTimeout(() => {
        // Validate and sanitize continueUrl to prevent open redirect vulnerabilities
        const validatedUrl = validateContinueUrl(continueUrl)
        window.location.href = validatedUrl
      }, 2000)
    } catch (error) {
      console.error('Error verifying email:', error)
      statusElement.textContent = `Error: ${error.message}`
    }
  }

  // Helper function to validate continue URL
  function validateContinueUrl(url) {
    try {
      // If URL is relative (starts with /), return as is
      if (url.startsWith('/')) {
        return url
      }

      // For absolute URLs, validate they belong to the same domain
      const currentDomain = window.location.hostname
      const urlObject = new URL(url)

      if (urlObject.hostname === currentDomain) {
        return url
      }

      // If URL is invalid or external, return default home URL
      console.warn('Invalid continue URL, using default')
      return '/'
    } catch (error) {
      console.warn('Error validating continue URL:', error)
      return '/'
    }
  }
})(jQuery)

// Example HTML structure for verification page:
/*
<div class="email-verification-container">
    <h2>Email Verification</h2>
    <div id="verification-status">Checking verification status...</div>
</div>
*/
