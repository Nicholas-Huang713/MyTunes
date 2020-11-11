import React, {useEffect, useState, useContext} from 'react'
import firebase from '../../firebase/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useHistory } from 'react-router-dom';
import {UserContext} from '../../providers/UserProvider';
import { useSelector, useDispatch } from 'react-redux';
import {login} from '../../store/actions/userActions';
import './Register.scss';

export default function Register() {
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.user.isLogged);

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
        // console.log("logged user: " + loggedUser)
        // if(isLogged) {
        //     history.push('/dashboard');
        // } else {
            if(loggedUser) {
                // dispatch(login(!!loggedUser));
                setRedirect('/dashboard');
            }
        // }
    }, [loggedUser])

    if(redirect) {
        // <Redirect to={redirect} />
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
