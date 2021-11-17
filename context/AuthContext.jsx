import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();
  // state variables
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [signInInput, setSignInInput] = useState({ email: "", password: "" });
  const [signUpInput, setSignUpInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Signed In");
        const { uid, displayName, email } = user;
        setLoggedInUser({ uid, email, displayName });
        router.push("/");
        getProductList(uid);
      } else {
        console.log("Signed Out");
        setLoggedInUser(null);
        router.push("/signin");
      }
      // console.log(user, loggedInUser);
    });
  }, []);

  // methods
  const handleSignInInputChange = (e) => {
    setSignInInput({ ...signInInput, [e.target.name]: e.target.value });
  };

  const handleSignUpInputChange = (e) => {
    setSignUpInput({ ...signUpInput, [e.target.name]: e.target.value });
  };

  const createDbDocument = async (uid, email, displayName) => {
    const docRef = doc(db, "users", uid);
    try {
      const createResult = await setDoc(docRef, {
        email,
        displayName,
        productList: [],
      });
      console.log(createResult);
    } catch (err) {
      alert(`Error in creating db document : ${err.message}`);
    }
  };

  const getProductList = async (uid) => {
    const docRef = doc(db, "users", uid);
    try {
      const result = await getDoc(docRef);
      console.log(result.data());
      setProducts(result.data().productList);
    } catch (err) {
      alert(`Err in fetching products : ${err.message}`);
    }
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
          signInInput.email,
          signInInput.password
        );
        setSignInInput({ email: "", password: "" });
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
          createDbDocument(
            auth.currentUser.uid,
            auth.currentUser.email,
            signUpInput.name
          );
        }
        setSignUpInput({ name: "", email: "", password: "", confirmPass: "" });
      } catch (error) {
        alert(`Err in Sign Up : ${error.message}`);
      }
    }
  };

  const values = {
    loggedInUser,
    products,
    signInInput,
    signUpInput,
    handleSignInInputChange,
    handleSignUpInputChange,
    handleAuthentication,
    getProductList,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export { AuthContext };
