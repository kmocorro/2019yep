import React, { Fragment } from 'react';
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

import NextLink from '../src/Link'


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import QRCode from 'qrcode.react';


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
    heroButtons: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(20)
    },
    cardGrid: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(8),
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
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 6,
    },
}));

export default function Layout(props) {
    const classes = useStyles();
    //console.log(props.data);
    const user = props.data;
    //console.log(user);

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
                    props.data.participated[0].isAccepted === ''  ?
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
                                        Do not forget to take a photo of the QR code. 
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
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Hi {user.nickName}!
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            We're inviting you to come and join to our 2019 Year End Party wearing your formal black and white attire! Our venue will be at the Enchanting Events Place, Santa Rosa City, Laguna.
                        </Typography>
                        <div className={classes.heroButtons}>
                        <Grid container spacing={2} justify="center">
                            <Grid item lg={7}>
                            <NextLink href="/yes">
                                <Button variant="contained" color="primary" size="large" fullWidth>
                                    <Typography size="51">
        
                                        Yes, I will join
                                    </Typography>
                                </Button>
                            </NextLink>
                            </Grid>
                            <Grid item>
                            <NextLink href="/no">
                                <Button variant="outlined" color="primary"  size="large" fullWidth>
                                    No, maybe next year
                                </Button>
                            </NextLink>
                            </Grid>
                        </Grid>
                        </div>
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
                                        Do not forget to take a photo of the QR code. 
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
                        <>
                        </>
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