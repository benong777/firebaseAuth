import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  // isAuthenticated: go to Home page
  // !isAuthenticated: go to SignIn page
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {                   // got authenticated user
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;   // clear hook when component unmounts
  }, [])

  const updateUserData = async (userId) => {
    const docRef = doc(db, 'users', userId);
    // Get document data from docRef
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({ ...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId });
    }

  }

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (e) {
      let msg = e.message;
        if (msg.includes('(auth/invalid-email)')) msg = 'Invalid email';
        if (msg.includes('(auth/invalid-credential)')) msg = 'Wrong Credentials';
        return { success: false, msg };
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true }
    } catch (e) {
      return { success: false, msg: e.message, error: e }
    }
  }

  const register = async (email, password, username, profileUrl) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Register response:', res?.user);

      ////-- Not needed since the useEffect above will trigger and set both
      // setUser(res?.user);
      // setIsAuthenticated(true);

      await setDoc(doc(db, 'users', res?.user?.uid), {
        username,
        profileUrl,
        userId: res?.user?.uid
      });
      return { success: true, data: res?.user };
    } catch (e) {
      let msg = e.message;
      if (msg.includes('(auth/invalid-email)')) msg = 'Invalid email';
      if (msg.includes('(auth/email-already-in-use)')) msg = 'This email is already in use';
      return { success: false, msg };
    }
  }

  return (
    <AuthContext.Provider value={{user, isAuthenticated, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  )
};


export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error ('useAuth must be wrapped inside AuthContextProvider!');
  }
  return value;
}