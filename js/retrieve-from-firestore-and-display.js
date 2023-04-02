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
