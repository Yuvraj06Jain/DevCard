import { useState, useEffect } from 'react';

function useUserDetails(username){
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then((res) => setData(res))
    },[username]);

    return data;
}

export default useUserDetails;