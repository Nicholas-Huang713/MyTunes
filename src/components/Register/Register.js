import React, {useEffect, useState, useContext} from 'react'
import firebase from '../../firebase/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useHistory } from 'react-router-dom';
import {UserContext} from '../../providers/UserProvider';
import './Register.scss';

export default function Register() {
    const [redirect, setRedirect] = useState(null);

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
          signInSuccessWithAuthResult: () => false
        }
    }
    
    const loggedUser = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if(loggedUser) {
            setRedirect('/dashboard');
        }
    }, [loggedUser])

    if(redirect) {
        history.push(redirect);
    }
      
    return (
        <div>
            Register
            <StyledFirebaseAuth 
                firebaseAuth={firebase.auth()}
                uiConfig={uiConfig}
            />
         </div>
    )
}
