import React, {useEffect, useState, useContext} from 'react'
import firebase from '../../firebase/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './Login.scss';
import {UserContext} from '../../providers/UserProvider';

export default function Login() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const loggedUser = useContext(UserContext)

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          signInSuccessWithAuthResult: () => false
        }
    } 
    
    return (
        <div>
            Login
            {isSignedIn? (
                <>
                    <div>Signed In!</div>
                    <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
                </>
                ) : (
                    <StyledFirebaseAuth 
                        firebaseAuth={firebase.auth()}
                        uiConfig={uiConfig}
                    />
                )
            }
                
         </div>
    )
}
