import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCtZHer3WXh9KlUJCIU5ZQEx7AT743yo34",
    authDomain: "examen-trujillo-pablo.firebaseapp.com",
    databaseURL: "https://examen-trujillo-pablo-default-rtdb.firebaseio.com",
    projectId: "examen-trujillo-pablo",
    storageBucket: "examen-trujillo-pablo.appspot.com",
    messagingSenderId: "116463053017",
    appId: "1:116463053017:web:9ab37544775c7242b836c8",
    measurementId: "G-276CCPFNF6"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const getCurrentUser = () =>{
    return firebase.auth().currentUser
}

export const authentication = async (email, password) => {
    try {
        const response = await firebase.auth().signInWithEmailAndPassword(email,password); 
        console.log(response); 
        return true;
    } catch (error) {
        console.log(error)
        return false;         
    }
}


export default firebase;