// https://firebase.google.com/docs/auth/custom-email-handler

const getURLQueryParam = (name) => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(name)
}

function handleResetPassword(auth, actionCode, continueUrl, lang) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.

  // Verify the password reset code is valid.
  auth
    .verifyPasswordResetCode(actionCode)
    .then((email) => {
      var accountEmail = email

      console.log({ accountEmail })

      // TODO: Show the reset screen with the user's email and ask the user for
      // the new password.
      var newPassword = '123456'

      // Save the new password.
      auth
        .confirmPasswordReset(actionCode, newPassword)
        .then((resp) => {
          console.log(resp)
          // Password reset has been confirmed and new password updated.

          // TODO: Display a link back to the app, or sign-in the user directly
          // if the page belongs to the same domain as the app:
          //   auth
          //     .signInWithEmailAndPassword(accountEmail, newPassword)
          //     .then(console.log)

          // TODO: If a continue URL is available, display a button which on
          // click redirects the user back to the app via continueUrl with
          // additional state determined from that URL's parameters.
        })
        .catch((error) => {
          // Error occurred during confirmation. The code might have expired or the
          // password is too weak.
          console.error(error)
        })
    })
    .catch((error) => {
      // Invalid or expired action code. Ask user to try to reset the password
      // again.
      console.error(error)
    })
}

;(function ($) {
  'use strict'

  $(function () {
    console.log('Frontend - Email Action Handler')
    const waitForFirebase = setInterval(() => {
      if (typeof firebase !== 'undefined' && firebase.apps.length) {
        // TODO: Implement getParameterByName()

        // Get the action to complete.
        const mode = getURLQueryParam('mode')
        // Get the one-time code from the query parameter.
        const actionCode = getURLQueryParam('oobCode')
        // (Optional) Get the continue URL from the query parameter if available.
        const continueUrl = getURLQueryParam('continueUrl')
        // (Optional) Get the language code if available.
        const lang = getURLQueryParam('lang') || 'en'

        const auth = firebase.auth()

        console.log({ mode, actionCode, continueUrl, lang })

        // Handle the user management action.
        switch (mode) {
          case 'resetPassword':
            // Display reset password handler and UI.
            handleResetPassword(auth, actionCode, continueUrl, lang)
            break
          //   case 'recoverEmail':
          //     // Display email recovery handler and UI.
          //     handleRecoverEmail(auth, actionCode, lang);
          //     break;
          //   case 'verifyEmail':
          //     // Display email verification handler and UI.
          //     handleVerifyEmail(auth, actionCode, continueUrl, lang);
          //     break;
          default:
          // Error: invalid mode.
        }

        clearInterval(waitForFirebase)
      }
    }, 1000)
  })
})(jQuery)
