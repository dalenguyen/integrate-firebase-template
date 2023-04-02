// call cloud functions
module.exports = generateToken = () => {
  const token = firebase.functions().httpsCallable('users-getCustomToken')
  token().then((result) => {
    console.log(result)
  })
}
