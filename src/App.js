import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [songList, setSongList] = useState([]);
  const [inputText, setInputText] = useState('');

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
          setSongList(response.data);
          setInputText('');
        }).catch((error) => {
          console.error(error);
        })
        
    }
  }

  return (
    <div className="App">
      Music Search
      <input 
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Search Artist"
        onKeyUp={handleKeyUp}
      />
    </div>
  );
}

export default App;
