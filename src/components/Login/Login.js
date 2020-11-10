import React, {useEffect, useState} from 'react'
import firebase from '../../firebase/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './Login.scss';

export default function Login() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          signInSuccessWithAuthResult: () => false
        }
      } 
      
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            console.log( user)
            setIsSignedIn(!!user)
        })
    }, [])
    return (
        <div>
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
