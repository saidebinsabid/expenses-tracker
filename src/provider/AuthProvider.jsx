import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password, name) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = userCredential.user;

      await updateProfile(currentUser, { displayName: name });
      await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name,
        email,
      });
      await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email },
        { withCredentials: true }
      );

      return currentUser;
    } catch (error) {
      console.error("Email registration error:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    setLoading(true);
    return signOut(auth).then(() => {
      axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
        withCredentials: true,
      });
      setLoading(false);
    });
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    logoutUser,
    signInUser,
    loading,
    setLoading,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
