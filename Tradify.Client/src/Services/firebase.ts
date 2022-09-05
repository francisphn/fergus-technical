import { initializeApp } from "firebase/app"

import firebase, {
    GoogleAuthProvider,
    getAuth,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    onAuthStateChanged,
    isSignInWithEmailLink,
    signOut
} from "firebase/auth"



const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'http://localhost:3000/authenticate',
    // This must be true.
    handleCodeInApp: true
};

const sendSignInEmail = async (email: string) => {
    let return_value = false
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
            return_value = true
            window.localStorage.setItem('emailForSignIn', email);
        }).catch((error) => {

        });
    return return_value;
}

const confirmEmail = async () => {
    let return_value = null;
    if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
            email = window.prompt('Please provide your email address for confirmation:');
        }

        if (email) {
            await signInWithEmailLink(auth, email, window.location.href)
                .then(async (result) => {
                    window.localStorage.removeItem('emailForSignIn');

                    await auth.currentUser?.getIdToken(true).then((idToken) => {
                        window.localStorage.setItem("idToken", idToken)
                    })

                    return_value = result.user;
                })
                .catch((error) => {
                    return_value = null;
                });
        }
    }
    return return_value;
}



const signMeOut = async () => {
    await signOut(auth).then(() => {
        window.localStorage.setItem('emailForSignIn', '');
        window.localStorage.removeItem("idToken")
        return true;
    }).catch(() => {
        return false;
    });
};

export {
    auth,
    sendSignInEmail,
    confirmEmail,
    signMeOut
};