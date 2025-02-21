import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig.js";
import {
    signOut, 
    signInWithPopup, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    } from "firebase/auth";

const AuthContext = createContext(null);

function AuthProvider({children}){
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
  
      const googleProvider = new GoogleAuthProvider();
  
      //!Login with Google 
      function googleLogin(){
        setLoading(true)
        return signInWithPopup(auth, googleProvider);

      }

      //! SignOut 
      function signOutUser(){
        setLoading(false)
        return signOut(auth)
      }

      const name = "Nayan";
  
      //! Observer 
      useEffect(()=>{
        const subscriber = onAuthStateChanged(auth, async(currentUser)=>{
          // console.log(currentUser);
          
          if(currentUser?.email){
              setUserData(currentUser);
              setLoading(false)
            }else{
              setUserData(null);
              setLoading(false)
            }
            setLoading(false)
            
          })
          return ()=>{
          subscriber()
        } 
      },[])
  
      console.log(userData);
  
      const authObject = {
        name,
        loading,
        userData,
        googleLogin,
        signOutUser,
      }
  return (
    <AuthContext.Provider value={authObject}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = ()=>{
    return useContext(AuthContext);
}

export default AuthProvider