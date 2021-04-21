import firebase from 'firebase'

const firebaseApp = firebase.initializeApp ({
        apiKey: "AIzaSyCHxdty2bKXB0H4cNQsFvW_rksmVcFX0YY",
        authDomain: "chat-29c42.firebaseapp.com",
        projectId: "chat-29c42",
        storageBucket: "chat-29c42.appspot.com",
        messagingSenderId: "869074642266",
        appId: "1:869074642266:web:9241030def773d10407f63"
})

const db = firebaseApp.firestore()

export default db