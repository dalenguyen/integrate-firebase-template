// get data from firestore and paginate it
const getUsersAndPagination = async () => {
  try {
    const db = firebase.firestore()

    // Retrieve data from the users collection
    const usersRef = db.collection('users')

    // Get the first 10 users
    const userSnapshot = await usersRef.limit(10).get()

    userSnapshot.forEach((doc) => {
      // Process the data for each document
      console.log(doc.id, ' => ', doc.data())
    })

    const lastVisibleDoc = userSnapshot.docs[userSnapshot.docs.length - 1]

    console.log({ lastVisibleDoc })

    // Retrieve the next 10 users
    const nextQuerySnapshot = await usersRef
      .startAfter(lastVisibleDoc)
      .limit(10)
      .get()

    nextQuerySnapshot.forEach((doc) => {
      // Process the data for each document
      console.log(doc.id, ' => ', doc.data())
    })
  } catch (error) {
    console.error(error)
  }
}
