import {firebase} from '@firebase/app'
import '@firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyB-xY-k-QNBeppsW6xsrjhKgk7Q1BTeBiQ",
  authDomain: "library-management-syste-dd9a1.firebaseapp.com",
  projectId: "library-management-syste-dd9a1",
  storageBucket: "library-management-syste-dd9a1.appspot.com",
  messagingSenderId: "525178056806",
  appId: "1:525178056806:web:b9134ed4e05890e841fda7"
};

firebase.initializeApp(firebaseConfig)

export default firebase.firestore()