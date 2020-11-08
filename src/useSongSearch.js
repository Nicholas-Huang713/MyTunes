import {useEffect, useState} from 'react'
import axios from 'axios';


export default function useSongSearch(query, pageNumber, inputText) {

    const [loading, setLoading]= useState(true);
    const [error, setError]= useState(false);
    const [songs, setSongs]= useState([]);
    const [hasMore, setHasMore]= useState(false);

    useEffect(() => {
        setSongs([]);
    }, [query])
    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;
        axios({
            method: 'GET',
            url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
            params: { q: query, page: pageNumber},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setBooks(prevBooks => {
                return [...new Set([...prevBooks, ...res.data.docs.map(b => b.title)])]
            })
            setHasMore(res.data.docs.length > 0);
            setLoading(false);
        }).catch(e => {
            if(axios.isCancel(e)) return;
            setError(true);
        })

        return () => cancel();
    }, [query, pageNumber])
    return {loading, error, songs, hasMore}
}
