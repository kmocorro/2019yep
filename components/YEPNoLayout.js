import React, { Fragment, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import DeviceHub from '@material-ui/icons/DeviceHub';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';

import NextLink from '../src/Link';
import CircularProgress from '@material-ui/core/CircularProgress';

import QRCode from 'qrcode.react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {' © '}
        SunPower Fab4 {' '}
      {new Date().getFullYear()}
      {'. Built with ❤️ by '}
        <Tooltip title="Kevin Mocorro" placement="top">
        <Link color="inherit" href="https://kevinmocorro.com">
            kdm
        </Link>
        </Tooltip>
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
        color: '#333'
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    menu: {
        width: 200,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 500,
    },
    heroButtons: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(20),
    },
    cardGrid: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(8),
    },
    title: {
        fontSize: 14,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    button: {
      marginRight: theme.spacing(2),
    },
}));

const reasons = [
  {
    value: 'Conflict / Change Shift',
    label: 'Conflict / Change Shift',
  },
  {
    value: 'Not interested',
    label: 'Not interested',
  },
  {
    value: 'I don\'t like the theme',
    label: 'I don\'t like the theme',
  },
  {
    value: 'Not happy with the Raffle Prizes',
    label: 'Not happy with the Raffle Prizes',
  },
  {
    value: 'It\'s just personal',
    label: 'It\'s just personal',
  },
];

export default function Layout(props) {
    const classes = useStyles();
    //console.log(props.data);
    const user = props.data;
    console.log(user);

    const [values, setValues] = useState({
        reasons: 'Not happy with the Raffle Prizes'
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    /** GET TICKET BUTTON --- Upload details to db ---------------------------- */
    const [ loading, setLoading ] = useState(false);
    const [ submitResponse, setSubmitResponse ] = useState('');

    const handleSubmit = () => {

        setLoading(true);
    
        (async () => {
            const res_submit = await fetch(`http://dev-metaspf401.sunpowercorp.com:8080/api/no`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    employeeNumber: user.employeeNumber,
                    isAccepted: 0,
                    transportation: '',
                    incomingRoute: '',
                    outgoingRoute: '',
                    reason: values.reasons
                })
            });
    
            //console.log(res_submit);
    
            const content = await res_submit.json();
            
            console.log(content);
    
            if(content.success){
    
                console.log(content.success);
                setLoading(prevLoading => !prevLoading);
                setSubmitResponse('success');
                
            } else if(content.error){
    
                console.log(content.error);
            }
    
        })();
    }
    /** end  GET TICKET BUTTON--- Upload details to db ---------------------------- */

    return (
        <Fragment>
        <CssBaseline />
        <AppBar position="relative" style={{backgroundColor: '#fff', boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 1px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)    '}}>
            <Toolbar>
            <DeviceHub className={classes.icon}/>
            <Typography variant="h6" color="textPrimary">
                META
            </Typography>
            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
                spacing={2}
            >
                <Grid item>
                    <Typography color="textPrimary" variant="overline">
                        {user.username}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="outlined" size="small" color="default" onClick={props.logout}>
                        logout
                    </Button>
                </Grid>
            </Grid>
            </Toolbar>
        </AppBar>
        <main>
            {/* Hero unit */}
            <div className={classes.heroContent}>
            <Container maxWidth="sm">
                {
                    /** IF USER IS NOT REGISTERED. */
                    props.data.participated[0].isAccepted === ''  ?
                        /** IF USER REFRESH THE PAGE AFTER REGISTRATION -- HINT: TOKEN */
                        props.data.updated_token[0].isAccepted === 1 ?
                        <>
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Hi {user.nickName}!
                            </Typography>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                See you at the Enchanting Events Place, Santa Rosa City, Laguna!
                            </Typography>
                            <Card>
                                <CardContent className={classes.cardcontent}>
                                    <Grid container spacing={2} 
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center" >
                                        <Grid item lg={9}>
                                            <Typography className={classes.title} color="textSecondary" variant={"overline"}>
                                                2019 Year End Party Ticket
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={3}>
                                            <Typography align="right" className={classes.title} color="textSecondary" variant={"overline"}>
                                                {user.employeeNumber} {user.yep[0].location}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item lg={4}>
                                            <QRCode size={150} level={"M"} value={`http://192.168.1.2:9000/?e=${user.employeeNumber}&s=${user.yep[0].shift}`} />
                                        </Grid>
                                        <Grid item lg={8}>
                                            <Typography component="h2" variant="h5">
                                                {user.displayName}
                                            </Typography>
                                            <Typography className={classes.pos} color="textSecondary">
                                                {user.title}
                                            </Typography>
                                            {
                                                user.yep[0].service_awardee !== 'No' ?
                                                <>
                                                    <Typography component="h2" variant="h5">
                                                        {user.yep[0].service_awardee} ✨🎉
                                                    </Typography>
                                                    <Typography className={classes.pos} color="textSecondary">
                                                        Congratulations! You are a Service Awardee
                                                    </Typography>
                                                </>
                                                : <></>
                                            }
                                            {  
                                                user.yep[0].shift === 'X' || user.yep[0].shift === 'Z' ?
                                                    <>
                                                    <Typography component="h2" variant="h5">
                                                        December 4, 5:00 PM
                                                    </Typography>
                                                    <Typography className={classes.pos} color="textSecondary">
                                                        Schedule
                                                    </Typography>
                                                    </>
                                                : user.yep[0].shift === 'Y' || user.yep[0].shift === 'E' || user.yep[0].shift === 'F' ?
                                                    <>
                                                    <Typography component="h2" variant="h5">
                                                        December 5, 5:00 PM
                                                    </Typography>
                                                    <Typography className={classes.pos} color="textSecondary">
                                                        Schedule
                                                    </Typography>
                                                    </>
                                                : <></>
                                            }
                                            <Grid container spacing={2}>
                                                    <Grid item>
                                                        <Typography color="primary" variant={"subtitle2"}>
                                                            This will serve as your ticket and a chance to win prizes on the day of the party. Drive Safely. Do not Drink and Drive.
                                                        </Typography>
                                                    </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Typography variant={"caption"}>
                                        Do not forget to take a photo on the QR code. 
                                    </Typography>
                                </Grid>
                            </Grid>
                        </>
                        : props.data.updated_token[0].isAccepted === 0 ?
                        <>
                            <Typography variant="h2" align="center" gutterBottom>Thank you</Typography>
                            <Typography color="textSecondary"  align="center" gutterBottom>You declined the invitation. If this is wrong, contact your HR representative immediately.</Typography>
                        </>
                        :
                        <>
                            {
                                loading ?
                                <Grid container justify="center" spacing={6} direction="row" alignItems="center">
                                    <Grid item>
                                        <CircularProgress className={classes.progress} />
                                    </Grid>
                                </Grid>
                                : 
                                    submitResponse === '' ? 
                                    <>
                                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                        Oh! Okay...
                                    </Typography>
                                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                        Before you go, please tell us the reason for declining the invitation
                                    </Typography>
                                    <div className={classes.heroButtons}>
                                    <Grid container spacing={2} justify="center" alignItems="center">
                                        <Grid item>
                                            <TextField
                                                select
                                                label="Select"
                                                className={classes.textField}
                                                fullWidth
                                                value={values.reasons}
                                                onChange={handleChange('reasons')}
                                                SelectProps={{
                                                MenuProps: {
                                                        className: classes.menu,
                                                    },
                                                }}
                                                helperText="Please select your reason"
                                                margin="normal"
                                            >
                                                {reasons.map(option => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item >
                                            <NextLink href="/">
                                                <Button variant="default" className={classes.button} >
                                                    Back
                                                </Button>
                                            </NextLink>
                                            <Button variant="contained" className={classes.button} color="primary" onClick={handleSubmit}>
                                                Submit
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    </div>
                                    </>
                                    : submitResponse === 'success' ?
                                    <>
                                    <Typography variant="h2" align="center">Thank you</Typography>
                                    </>
                                    :
                                    <>
                                    <Typography>Error from server.</Typography>
                                    </>
                            }
                            
                        </>
                    : props.data.participated[0].isAccepted === 1 ?
                    <>      
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Hi {user.nickName}!
                            </Typography>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                See you at the Enchanting Events Place, Santa Rosa City, Laguna!
                            </Typography>
                            <Card>
                                <CardContent className={classes.cardcontent}>
                                    <Grid container spacing={2} 
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center" >
                                        <Grid item lg={9}>
                                            <Typography className={classes.title} color="textSecondary" variant={"overline"}>
                                                2019 Year End Party Ticket
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={3}>
                                            <Typography align="right" className={classes.title} color="textSecondary" variant={"overline"}>
                                                {user.employeeNumber} {user.yep[0].location}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item lg={4}>
                                            <QRCode size={150} level={"M"} value={`http://192.168.1.2:9000/?e=${user.employeeNumber}&s=${user.yep[0].shift}`} />
                                        </Grid>
                                        <Grid item lg={8}>
                                            <Typography component="h2" variant="h5">
                                                {user.displayName}
                                            </Typography>
                                            <Typography className={classes.pos} color="textSecondary">
                                                {user.title}
                                            </Typography>
                                            {
                                                user.yep[0].service_awardee !== 'No' ?
                                                <>
                                                    <Typography component="h2" variant="h5">
                                                        {user.yep[0].service_awardee} ✨🎉
                                                    </Typography>
                                                    <Typography className={classes.pos} color="textSecondary">
                                                        Congratulations! You are a Service Awardee
                                                    </Typography>
                                                </>
                                                : <></>
                                            }
                                            {  
                                                user.yep[0].shift === 'X' || user.yep[0].shift === 'Z' ?
                                                    <>
                                                    <Typography component="h2" variant="h5">
                                                        December 4, 5:00 PM
                                                    </Typography>
                                                    <Typography className={classes.pos} color="textSecondary">
                                                        Schedule
                                                    </Typography>
                                                    </>
                                                : user.yep[0].shift === 'Y' || user.yep[0].shift === 'E' || user.yep[0].shift === 'F' ?
                                                    <>
                                                    <Typography component="h2" variant="h5">
                                                        December 5, 5:00 PM
                                                    </Typography>
                                                    <Typography className={classes.pos} color="textSecondary">
                                                        Schedule
                                                    </Typography>
                                                    </>
                                                : <></>
                                            }
                                            <Grid container spacing={2}>
                                                    <Grid item>
                                                        <Typography color="primary" variant={"subtitle2"}>
                                                            This will serve as your ticket and a chance to win prizes on the day of the party. Drive Safely. Do not Drink and Drive.
                                                        </Typography>
                                                    </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Typography variant={"caption"}>
                                        Do not forget to take a photo on the QR code. 
                                    </Typography>
                                </Grid>
                            </Grid>
                    </>

                    : props.data.participated[0].isAccepted === 0 ?
                    <>
                        <Typography variant="h2" align="center" gutterBottom>Thank you</Typography>
                        <Typography color="textSecondary"  align="center" gutterBottom>You declined the invitation. If this is wrong, contact your HR representative immediately.</Typography>
                    </>
                    : 
                    <></>

                }
                
            </Container>
            </div>
            {/* End hero unit */}
            { /**
            <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={2}>

            </Grid>
            </Container>
            */ }
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
                {/** meta/yep */}
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
               {/**  2019 Year End Party Online Registration */}
            </Typography>
            <Copyright />
            <Typography variant="caption" align="center" color="textSecondary" component="p">
            {/** meta is made possible through the work of other open source software. */}
            </Typography>
        </footer>
        {/* End footer */}
        </Fragment>
    );
}

Layout.propTypes = {
    children: PropTypes.node,
};