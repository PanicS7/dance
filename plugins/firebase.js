import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/storage'
import '@firebase/firestore'

function initFirebase() {
  firebase.initializeApp({
    apiKey: 'AIzaSyDgWiyTJJ5i0s2Y6VV-6HPsbQpiBuzi8to',
    authDomain: 'dance-169a7.firebaseapp.com',
    projectId: 'dance-169a7',
    storageBucket: 'dance-169a7.appspot.com',
    messagingSenderId: '782961572123',
    appId: '1:782961572123:web:00b90034acf4eef84bbbbe',
    measurementId: 'G-CLG6PEB51P',
  })
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .enablePersistence()
      .then(resolve)
      .catch((err) => {
        if (err.code === 'failed-precondition') {
          reject(err)
          // Multiple tabs open, persistence can only be
          // enabled in one tab at a a time.
        } else if (err.code === 'unimplemented') {
          reject(err)
          // The current browser does not support all of
          // the features required to enable persistence
        }
      })
  })
}

initFirebase().catch((error) => {
  if (error) {
    this.$route.back()
  }
  // take user to a page stating an error occurred
  // (might be a connection error, or the app is open in another tab)
})

export { firebase }
export const auth = firebase.auth()
