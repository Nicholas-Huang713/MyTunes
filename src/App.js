import React, {useState, useEffect, useRef, useCallback} from 'react';
import './App.scss';
import axios from 'axios';
import NavBar from './components/NavBar/NavBar';
import Song from './components/Song/Song';
import Player from './components/Player/Player';
// import useSongSearch from './useSongSearch';
import firebase from './firebase';

function App() {
  const [songList, setSongList] = useState([]);
  const [inputText, setInputText] = useState('');
  const [currentSong, setCurrentSong] = useState(null);
  const [faveList, setFaveList] = useState([]);

  useEffect(() => {
   const unsubscribe = firebase
   .firestore().collection('favorites').onSnapshot((snapshot) => {
     const faves = snapshot.docs.map((song) => ({
        songId: song.songId,
        ...song.data()
     }))
     setFaveList(faves);
   })
    return () => {
      unsubscribe();
    }
  }, [])


  const handleKeyUp = (e) => {
    e.preventDefault();
    if(e.key === 'Enter') {
        e.preventDefault();
        const options = {
          method: 'GET',
          url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
          params: {q: inputText},
          headers: {
            'x-rapidapi-key': '97b3d67fd7msh8ae0214eedae588p157a2cjsn1de270448a3e',
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
          }
        };
        axios.request(options).then((response) => {
          console.log(response.data);
          setSongList(response.data.data);
        }).catch((error) => {
          console.error(error);
        });
        setInputText('');
    }
  }

  const handleSelectSong = (song) => {
    setCurrentSong(song);
  }

  return (
    <div className="App">
      <NavBar />
     <h1> Music Search</h1>
      <input 
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Search Artist or Song"
        onKeyUp={handleKeyUp}
      />
      {currentSong !== null &&
        <Player currentSong={currentSong} handleSelectSong={handleSelectSong} />
      }
      <ul>
        {faveList !== [] && faveList.map((song) => (
          <li>{song.title}</li>
        ))}
      </ul>
      

      <ul>
        {
          songList.map((song) => {
            return ( <li key={song.id}>
              <Song song={song} handleSelectSong={handleSelectSong} />
            </li>
            )
          })
        }
      </ul>
      
    </div>
  );
}

export default App;
