import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credential = GoogleAuthProvider.credentialFromResult(res);
        const { displayName, email, photoURL, uid } = res.user

        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        await updateProfile(FirebaseAuth.currentUser, {
            displayName
        });


        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {

        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const signInWithEmailPassword = async ({ email, password }) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, displayName, photoURL } = resp.user;

        return {
            ok: true,
            uid, displayName, photoURL, email
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async ()=> {
    return await FirebaseAuth.signOut();
}