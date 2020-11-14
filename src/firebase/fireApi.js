import firebase from './firebase';

const db = firebase.firestore();
const auth = firebase.auth();

//add song to fave list
export const addFaves = (song) => {
    auth.onAuthStateChanged((user) => {
        if(user) {
            db.collection('playlists').doc(user.uid).get()
                .then((data) => {
                    // const songInfo = {
                    //     songId: song.id,
                    //     title: song.title,
                    //     cover_big: song.album.cover_big,
                    //     cover_small: song.album.cover_small,
                    //     artist: song.artist.name,
                    //     preview: song.preview,
                    //     duration: song.duration,
                    //     album: song.album.title
                    // }

                    if(data.exists) {
                        const faveList = data.data().liked;                    
                        if(faveList.length > 0) {
                            const updateList = [song, ...faveList];
                            db.collection("playlists").doc(user.uid)
                                .update({liked: updateList});
                        } else {
                            db.collection('playlists').doc(user.uid)
                                .set({
                                    userId: user.uid,
                                    liked: [song],
                                    name: user.displayName,
                                })
                        }
                    } else {
                        db.collection('playlists').doc(user.uid)
                            .set({
                                userId: user.uid,
                                liked: [song],
                                name: user.displayName,
                            })
                    }
                    
                })
        }
    })
}

//check for logged in user in db and if no user, create user in db
export const checkAndCreateUser = () => {
    auth.onAuthStateChanged((user) => {
        if(user) {
            const nameArr = user.displayName.split(' ');
            const first = nameArr[0];
            const last = nameArr[1];
            db.collection('users').doc(user.uid).get()
                .then((data) => {
                    if(!data.exists) {
                        db.collection('users').doc(user.uid)
                            .set({
                                userId: user.uid,
                                firstname: first,
                                lastname: last,
                                email: user.email,
                                favorites: [],
                            })
                    }
                }).catch((error) => {
                    console.log(error);
                });
        }
    })
}

export const getFaves = (
    auth.onAuthStateChanged((user) => {
        if(user) {
            db.collection('playlists').doc(user.uid).get()
                .then((data) => {
                    const faveList = data.data().liked;
                    if(!faveList) {
                        return [];
                    } else {
                        const faveIdList = faveList.map(song => song.id);
                        // console.log(faveIdList);
                        return faveIdList;
                    }
                }).catch(err => console.log(err)); 
        } else {
            return [];
        }
    })
)

export const removeFaves = (id) => {
    auth.onAuthStateChanged((user) => {
        if(user) {
            db.collection('playlists').doc(user.uid).get()
                .then((data) => {
                    if(data) {
                        const faveList = data.data().liked;
                        const updateList = faveList.filter((song) => +song.id !== +id);
                        db.collection("playlists").doc(user.uid)
                            .update({liked: updateList});
                    } 
                }).catch(err => console.log(err)); 
        } 
    })
}