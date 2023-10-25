import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { startLoadingNotes } from "../store/journal/thunks";


export const useCheckAuth = () => {
    //obtenemos el estado
    const { status } = useSelector((state) => state.auth);
//creo el dispatch
    const dispatch = useDispatch();

    //un efecto asincrono que se dispara solo una vez al cargar, comprueba
    //directamente con firebase si el usuario del state esta en firebase
    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout());
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(login({ uid, email, displayName, photoURL }));
                dispatch(startLoadingNotes());
            }
        });
    }, []);

    return{
        status
    }
}