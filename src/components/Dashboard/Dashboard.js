import React, {useState, useEffect, useContext} from 'react';
import firebase from '../../firebase/firebase';
import {checkAndCreateUser} from '../../firebase/fireApi';
import { useDispatch } from 'react-redux';
import { UserContext } from '../../providers/UserProvider';
import { useHistory } from "react-router-dom";
import mergeImages from 'merge-images';

export default function Dashboard() {
    
    const [userPlaylists, setUserPlaylists] = useState([]);
    const dispatch = useDispatch();

    const loggedUser = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);

    const history = useHistory();
    useEffect(() => {
        // dispatch(notHome());
        if (!loggedUser) {
            setRedirect("/");
        }
    }, [loggedUser]);

    if (redirect) history.push(redirect);

    useEffect(() => {
        checkAndCreateUser();
    }, [])

    useEffect(() => {
        firebase.firestore().collection('playlists').get()
            .then((data) => {
                
                if(data) {
                    let userList = [];
                    // setUserPlaylists(data.data());
                    data.forEach(doc => {
                        userList.push(doc.data())
                        // console.log(doc.data());
                    })
                    setUserPlaylists(userList);
                }
            })
        return () => {
        }
    }, [])
     
    return (
        <div>
            <h1> User Playlists</h1>
            <ul>
                {userPlaylists.map(user => (
                    <li key={user.userId}>{user.name}</li>
                    )) 
                }
            </ul>
            
         </div>
    )
}
