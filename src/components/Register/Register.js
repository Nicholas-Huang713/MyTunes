import React, {useEffect, useState, useContext} from 'react'
import firebase from '../../firebase/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect, useHistory } from 'react-router-dom';
import {UserContext} from '../../providers/UserProvider';
import './Register.scss';

export default function Register() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [redirect, setredirect] = useState(null);
    const loggedUser = useContext(UserContext);

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        // signInSuccessUrl: '/dashboard',
        callbacks: {
          signInSuccessWithAuthResult: () => true
        }
    }
    
    const history = useHistory();
    useEffect(() => {
        if(loggedUser) {
            setredirect('/dashboard');
        }
    }, [loggedUser])

    if(redirect) {
        history.push(redirect);
    }
      
    // useEffect(() => {
    //     firebase.auth().onAuthStateChanged(user => {
    //         if(user !== null) {
    //             console.log( user)
    //             const fullName = user.displayName.split(' ');
    //             const first = fullName[0];
    //             const last = fullName[1];

    //             firebase.firestore().collection('users').onSnapshot((snapshot) => {
            
    //                 const emailList = snapshot.docs.map((user) => (
    //                     user.email
    //                 ))
    //                 if(emailList.includes(user.email)){
    //                     setEmailErr('Email already exists');
    //                     return;
    //                 }
    //             })                
    //             firebase.firestore().collection('users')
    //                 .add({
    //                     firstname: first,
    //                     lastname: last,
    //                     email: user.email,
    //                 })
    //         }
    //     })
    // }, [])

    return (
        <div>
            Register
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
