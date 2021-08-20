import firebase from "firebase/app";
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDW_qaKhUuMJ1AYMF7RdwEotsE9wLJwyqE",
    authDomain: "cloud-storage-c2a48.firebaseapp.com",
    projectId: "cloud-storage-c2a48",
    storageBucket: "cloud-storage-c2a48.appspot.com",
    messagingSenderId: "524444669680",
    appId: "1:524444669680:web:96b9c494423863c87bd435",
    measurementId: "G-FD4CYY7HEJ"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

function upload(file, callback) {
    const uploadTask = storage.ref(`books/${file.name}`).put(file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
        (snapshot) => {},
        (error) => {
            // Handle unsuccessful uploads
            console.log(error)
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                callback(downloadURL)
            });
        }
    );
}



export default upload