import React, { createContext, useState } from "react";
import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "@firebase/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // state variables
  const [signInInput, setSignInInput] = useState({ email: "", password: "" });
  const [signUpInput, setSignUpInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  // methods
  const handleSignInInputChange = (e) => {
    setSignInInput({ ...signInInput, [e.target.name]: e.target.value });
  };

  const handleSignUpInputChange = (e) => {
    setSignUpInput({ ...signUpInput, [e.target.name]: e.target.value });
  };

  const updateDisplayName = async (name) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    } catch (error) {
      alert(`Err in updating displayName : ${error.message}`);
    }
  };

  const handleAuthentication = async (authenticationType) => {
    console.log("Authentication Type : ", authenticationType);

    if (authenticationType === "SIGN_IN") {
      try {
        await signInWithEmailAndPassword(
          auth,
          signUpInput.email,
          signInInput.password
        );
      } catch (error) {
        alert(`Err in Sign In : ${error.message}`);
      }
    }

    if (authenticationType === "SIGN_UP") {
      try {
        await createUserWithEmailAndPassword(
          auth,
          signUpInput.email,
          signUpInput.password
        );

        if (auth.currentUser) {
          updateDisplayName(signUpInput.name);
        }
      } catch (error) {
        alert(`Err in Sign Up : ${error.message}`);
      }
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Signed In");
      } else {
        console.log("Signed Out");
      }
      console.log(user);
    });
  };

  const values = {
    signInInput,
    signUpInput,
    handleSignInInputChange,
    handleSignUpInputChange,
    handleAuthentication,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export { AuthContext };
