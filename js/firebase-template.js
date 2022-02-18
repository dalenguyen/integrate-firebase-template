;(function ($) {
  'use strict'

  $(function () {
    console.log('Frontend - Integrate Firebase Template')
    const waitForFirebase = setInterval(() => {
      if (typeof firebase !== 'undefined' && firebase.apps.length) {
        console.log(firebase)
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User logged in already or has just logged in.
            console.log(user)
          }
        })
        clearInterval(waitForFirebase)
      }
    }, 1000)
  })
})(jQuery)
