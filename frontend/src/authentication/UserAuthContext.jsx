import { createContext, useContext, useEffect, useState } from "react";
import {
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
	signInWithPopup
} from "firebase/auth";
import { firebaseAuth } from "./firebaseConfig";

import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig"

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [docSnap, setDocSnap] = useState(null);

	function logout() {
		setUser(null);
		setDocSnap(null);
		return signOut(firebaseAuth);
	}

	function googleSignIn() {
		const googleAuthProvider = new GoogleAuthProvider();
		return signInWithPopup(firebaseAuth, googleAuthProvider);
	}

	async function makeUserDB() {
		if (user != null) {
			try {
				const ref = doc(db, "user", user.uid);
				// check to see if user already exists 
				getDoc(ref).then((res) => {
					if (!res.exists()) {
						const docRef = setDoc(ref, { new_sign_up: true });
					}
					else {
						console.log("User document already exists");
					}
				});
			} catch (e) {
				console.error("Error while adding user document: ", e);
			}
		}
	}

	async function getUserDB() {
		if (user != null) {
			const ref = doc(db, "user", user.uid);
			try {
				getDoc(ref).then((res) => {
					setDocSnap(res.data());
				});
			} catch (error) {
				console.log(error);
			}
		}
	}

	async function updateDB(formData) {
		if (user != null) {
			const ref = doc(db, "user", user.uid);
			try {
				setDoc(ref, formData).then((res) => {
					getUserDB();
				});
			} catch (error) {
				console.log(error);
			}
		}
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		}
	}, []);

	return (
		<userAuthContext.Provider value={{ user, docSnap, googleSignIn, makeUserDB, logout, getUserDB, updateDB }}>
			{children}
		</userAuthContext.Provider>
	)
}

export function useUserAuth() {
	return useContext(userAuthContext);
}
