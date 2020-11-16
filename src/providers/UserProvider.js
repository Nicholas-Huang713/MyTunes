import React, {useState, useEffect,  createContext} from "react";
import firebase from '../firebase/firebase'

export const UserContext = createContext({user: null})

export default (props) => {
    const [user, setuser] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                setuser({
                    displayName: user.displayName,
                    email: user.email,
                    id: user.uid
                })
            } else {
                setuser(null);
            }
        })
    },[])

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  )
}