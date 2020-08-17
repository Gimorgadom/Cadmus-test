import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Grid, TextField, Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';

import './style.css';
import Logo from '../../assets/logo.png';

import api from '../../services/api';

const SignIn = () => {
    const [ email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
    const [messageError, setMessageError] = useState('');
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       const token = localStorage.getItem('token');
       if(token){
        history.push('/loggedIn');
       }

       setLoading(false);
       
    }, []);

    async function handleLogin(e: any) {
        e.preventDefault();

        try {
            const response = await api.post('login', { email, password });
            const { token } = response.data;
            
            localStorage.setItem('token', token);
            
            setMessageError('');
            history.push('/loggedIn');
        } catch (err) {
            setMessageError('E-mail ou senha inválidos');
            alert('Falha no login, tente novamente');
        }
    }

    if(loading) return null;

    return (
        <div className='container'>
            <img src={Logo} alt="Logo Cadmus" className='logo'/>

            <Card onSubmit={handleLogin}>
                <CardContent>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField value={email} id="input-with-icon-grid" label="E-mail" onChange={e => setEmail(e.target.value)} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <VisibilityIcon />
                        </Grid>
                        <Grid item>
                            <TextField value={password} id="input-with-icon-grid" label="Password" type="password" onChange={e => setPassword(e.target.value)} />
                        </Grid>
                    </Grid>

                    

                    {!!messageError && 
                    <Grid container spacing={1} alignItems="flex-end">
                        <div>{messageError}</div>
                    </Grid>
                    }
                </CardContent>
            </Card>
            <div className='button'>
                <Button variant="contained" color="primary" onClick={handleLogin}>Entrar</Button>
            </div>
        </div>
    );
}

export default SignIn;