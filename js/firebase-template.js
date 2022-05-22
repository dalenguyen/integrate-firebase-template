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

            // trigger functions
            await getUser(user)
            // generateToken()
          }
        })
        clearInterval(waitForFirebase)
      }
    }, 1000)
  })
})(jQuery)

// call cloud functions
const generateToken = () => {
  const token = firebase.functions().httpsCallable('users-getCustomToken')
  token().then((result) => {
    console.log(result)
  })
}

// Get user data from Firebase & display it
const getUser = async (user) => {
  const userData = await firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .get()

  const role = userData.data()?.role

  if (role != null) {
    const roleData = await firebase
      .firestore()
      .collection('roles')
      .doc(role)
      .get()

    const el = document.querySelector('#user')

    if (el && roleData.data()) {
      // only get the first item
      const element = document.createElement('div')
      element.innerHTML = roleData.data()['1']
      el.appendChild(element)
    }
  }
}
