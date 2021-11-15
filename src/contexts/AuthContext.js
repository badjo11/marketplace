import React, { useEffect, useReducer } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export const authContext = React.createContext();
const INIT_STATE = {
    user: null,
};
const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload }
        default:
            return state;
    }
};

const AuthContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);
    // AUTH with google
    const googleProvider = new GoogleAuthProvider();
    const authWithGoogle = async () => {
        try {
            const response = await signInWithPopup(auth, googleProvider);
        } catch (e) {
            console.log(e);
        }
    };

    //! проверка на то что пользователь в системе или нет
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            dispatch({
                type: "SET_USER",
                payload: user,
            })
        })
    }, [])
    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <authContext.Provider
            value={{
                authWithGoogle,
                logOut,
                user: state.user,
            }}
        >
            {props.children}
        </authContext.Provider>
    );
};

export default AuthContextProvider;