import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import './style.css';
import { Button } from '@material-ui/core';

function LoggedIn() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
         history.push('/');
        } 

        setLoading(false);

     }, []);

    const history = useHistory();

    function logout() {
        localStorage.setItem('token', '');
            history.push('/');
    }

    if(loading) return null;

    return (
        <div className='container'>
            <p>
                Você está logado(a)!
            </p>

            <div className='button'>
                <Button variant="contained" color="primary" onClick={logout}>Deslogar</Button>
            </div>
        </div>
    );
}

export default LoggedIn;