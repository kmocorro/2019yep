import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { login } from '../utils/auth';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: { //  
        backgroundImage: 'url(http://dev-metaspf401.sunpowercorp.com:8080/images/2019YEP_login2.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignInSide() {
    const classes = useStyles();
    const username = useForm('');
    const password = useForm('');
    const [ responseError, setResponseError ] = useState('');

    function useForm(init){
        const [ value, setValue ] = useState(init);

        function handleOnChange(e){
            setValue(e.target.value);
        }

        return {
            value,
            onChange: handleOnChange
        }
    }

    async function handleOnSubmit(e){
        e.preventDefault();
        setResponseError('');

        const url = 'http://dev-metaspf401.sunpowercorp.com:8080/api/login2019yep';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username: username.value, 
                    password: password.value 
                })
            });

            if (response.ok) {
                const { token, err } = await response.json();

                //console.log(token);
                if( typeof token === 'undefined'){
                    //console.log({ err })
                    setResponseError(err ? err : responseError)
                } else {
                    //console.log({ token })
                    await login({ token });
                }
                
                
            } else {
                //console.log('Login failed.');

                let error = new Error(response.statusText)
                error.response = response

                //setResponseError(error)

                throw error
            }
        } catch (error) {
            console.error(' You have an error in your code or there are network issues. ', error)

            const { response } = error
            setResponseError(response ? response.statusText : responseError)
        }

    }

    return (
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="" variant="body" gutterBottom>
                META
            </Typography>
            <Typography variant="h5" component="h1">
                2019 Year End Party Online Registration
            </Typography>
            <form className={classes.form} onSubmit={handleOnSubmit} >
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username.value}
                onChange={username.onChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password.value}
                    onChange={password.onChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                Sign In to register / get your entrance ticket
                </Button>
                <Grid container>
                <Grid item xs>
                    <Typography variant="body2" color="error">
                        {responseError}
                    </Typography>
                </Grid>
                </Grid>
                <Grid item xs={12} lg={12} md={12}>
                    <Typography color="textSecondary" variant="caption">
                        By signing in, you agree that META was designed, developed and managed by fab4 engineering team and it does not track, store or save your password. If you have questions, please send an email to <a href="mailto:kmocorro@sunpowercorp.com?subject=META%20Sign-in">kdm</a>.
                    </Typography>
                </Grid>
            </form>
            </div>
        </Grid>
        </Grid>
    );
}