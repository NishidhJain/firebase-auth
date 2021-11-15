import React, { createContext, useState } from "react";

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

  const handleAuthentication = (authenticationType) => {
    console.log("Authentication Type : ", authenticationType);
    console.log("signIn", signInInput);
    console.log("signIp", signUpInput);
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
