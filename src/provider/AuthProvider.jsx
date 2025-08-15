import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
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

  //Register User
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
      await getAndStoreToken(email);

      return currentUser;
    } catch (error) {
      console.error("Email registration error:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  //Login User
  const signInUserWithJWT = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const currentUser = result.user;
      if (currentUser?.email) {
        await getAndStoreToken(currentUser.email);
      }
      return currentUser;
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout User
  const logoutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
        withCredentials: true,
      });
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  //Update Profile
  const updateUser = (updatedData) =>
    updateProfile(auth.currentUser, updatedData);

  //Reset Password
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  //Get JWT from backend
  const getAndStoreToken = async (email) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error getting JWT:", error.message);
    }
  };

  //Listen to Auth Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser?.email) {
        await getAndStoreToken(currentUser.email);
      }
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    signInUser: signInUserWithJWT,
    logoutUser,
    updateUser,
    resetPassword,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
