import React, { createContext, useEffect, useState } from "react";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import axios from "axios";
import useAxiosBase from "../Hooks/useAxiosBase";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [brandName, setBrandName] = useState("");
    const axiosBase = useAxiosBase();

    useEffect(()=>{
      setLoading(true)
      fetch("http://localhost:5000/products",{
        method: "GET",
        credentials: "include", // include credentials for cross-origin requests
      })
      .then(res=> res.json())
      .then(data => setProducts(data))

    },[])

  // email login
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // login with email
  const loginWithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

//   google login 
const googleLogin = ()=>{
  setLoading(true)
    return signInWithPopup(auth, provider);
}
//   github login 
const githubLogin = ()=>{
  setLoading(true)
    return signInWithPopup(auth, githubProvider);
}

  // observer 
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      const loggedUser = { email: currentUser?.email};  
      if(currentUser){
        axiosBase.post('/jwt',loggedUser)
        .then(res =>{
          console.log(res.data)
        })
      }else{
        axiosBase.post('/logout',loggedUser)
        .then(res =>{
          console.log(res.data)
        })
      }
      
    });
    return () => {
      unSubscribe();
    };
  }, []);


//   signout 

const signout = ()=>{
    return signOut(auth);
}

// updata name image 
const handleUpdateProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
    })
}

//handle brand Name 
const handleBrand = (brand_name)=>{
setBrandName(brand_name);
}


  const authinfo = {
    createUser,
    loginWithEmail,
    signout,
    handleUpdateProfile,
    googleLogin,
    githubLogin,
    user,
    products,
    loading,
    handleBrand,
    brandName
  };
  return (
    <AuthContext.Provider value={authinfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
