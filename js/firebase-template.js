;(function ($) {
  'use strict'

  $(function () {
    console.log('Frontend - Integrate Firebase Template')
    const waitForFirebase = setInterval(() => {
      if (typeof firebase !== 'undefined' && firebase.apps.length) {
        firebase.auth().onAuthStateChanged(async (user) => {
          // trigger functions after user is logged in
          if (user) {
            // User logged in already or has just logged in.
            console.log(user.uid)
            // await getUsersAndPagination()
          }
        })
        clearInterval(waitForFirebase)
      }
    }, 1000)
  })
})(jQuery)
