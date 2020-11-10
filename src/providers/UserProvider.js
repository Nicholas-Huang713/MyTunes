import React, {useState, useEffect,  createContext} from "react";
import firebase from '../firebase/firebase'

export const UserContext = createContext({user: null})

export default (props) => {
    const [user, setuser] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if(user !== null) {
                setuser({
                    displayName: user.displayName,
                    email: user.email
                })
            } 
        })
    },[])

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  )
}