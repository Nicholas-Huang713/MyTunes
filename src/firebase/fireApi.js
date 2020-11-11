import firebase from './firebase';

//add song to fave list
export const addFaves = (song) => {
    firebase.firestore()
        .collection('favorites')
        .add({
            songId: song.id,
            title: song.title,
            preview: song.preview,
            artist: song.artist.name,
            cover: song.album.cover_big
        })
}

//check for logged in user in db and if no user, create user in db
export const checkAndCreateUser = () => {
    const userInstance = firebase.auth().currentUser;
    let first, last;
    if(userInstance) {
        const nameArr = userInstance.displayName.split(' ');
        first = nameArr[0];
        last = nameArr[1];
    firebase.firestore()
        .collection('users').where("email", "==", userInstance.email)
        .get()
        .then((querySnapshot) => {
            if(querySnapshot.empty) {
                firebase
                .firestore().collection('users')
                .add({
                    userId: userInstance.uid,
                    firstname: first,
                    lastname: last,
                    email: userInstance.email,
                    favorites: [],
                })
            }
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }
}
