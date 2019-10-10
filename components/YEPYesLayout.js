import React, { Fragment, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import DeviceHub from '@material-ui/icons/DeviceHub';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CheckIcon from '@material-ui/icons/Check';

import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';

import SettingsIcon from '@material-ui/icons/Assignment';
import GroupAddIcon from '@material-ui/icons/AirportShuttle';
import VideoLabelIcon from '@material-ui/icons/ConfirmationNumber';
import StepConnector from '@material-ui/core/StepConnector';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import DriveEtaIcon from '@material-ui/icons/DriveEta';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import QRCode from 'qrcode.react';

import CircularProgress from '@material-ui/core/CircularProgress';

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

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 30,
        height: 30,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
        'linear-gradient( 136deg,rgb(0, 0, 0) 0%,rgb(134, 134, 134) 50%,rgb(255, 255, 255) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
        'linear-gradient( 136deg,rgb(0, 0, 0) 0%,rgb(134, 134, 134) 50%,rgb(255, 255, 255) 100%)',
    },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <AirportShuttleIcon />,
    2: <LocationOnIcon />,
    3: <ConfirmationNumberIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
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
        marginTop: theme.spacing(1),
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 6,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    cardcontent: {
        paddingBottom: 0
    }
}));

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(255, 255, 255) 0%,rgb(134, 134, 134) 50%,rgb(0, 0, 0) 100%)',
      },
    },
    completed: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(255, 255, 255) 0%,rgb(134, 134, 134) 50%,rgb(0, 0, 0) 100%)',
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
})(StepConnector);


function getSteps() {
  return ['Mode of Transportation', 'Incoming/Outgoing Route', 'Get Ticket and Take a Photo'];
}

function getStepContent(step, transportation, incomingRoute, outgoingRoute, user) {

    if(transportation.value == 'shuttle'){
        switch (step) {
            case 0:
                return <StepCase0 tranportation={transportation} />;
            case 1:
                return <StepCase1 incomingRoute={incomingRoute} outgoingRoute={outgoingRoute} />;
            case 2:
                return <StepCase2 transportation={transportation} incomingRoute={incomingRoute} outgoingRoute={outgoingRoute} user={user} />;
            default:
                return 'Unknown step';
        }
    } else {
        switch (step) {
            case 0:
                return <StepCase0 tranportation={transportation} />;
            case 1:
                return 'Reminder: Do not drink and drive!'
            case 2:
                return <StepCase2 transportation={transportation} incomingRoute={incomingRoute} outgoingRoute={outgoingRoute} user={user} />;
            default:
                return 'Unknown step';
        }
    }
}


function StepCase0(data){
     
    const transpo_children = [
        <ToggleButton key={1} value="car">
            <Typography>
                <DriveEtaIcon /> Car / Carpool
            </Typography>
        </ToggleButton>,
        
        <ToggleButton key={2} value="shuttle">
            <Typography>
                <DirectionsBusIcon /> Shuttle Service
            </Typography>
        </ToggleButton>,  
    ];

    return (
        <Grid container spacing={2} direction="column"
        justify="center"
        alignItems="center">
            <Grid item lg={12}>
                <Typography component="h2" variant="h5" gutterBottom>
                    Choose your Transportation mode
                </Typography>
                <Typography gutterBottom>
                    <ToggleButtonGroup
                        size="small"
                        value={data.tranportation.value}
                        exclusive
                        onChange={data.tranportation.onChange}
                    >
                        {transpo_children}
                    </ToggleButtonGroup>
                </Typography>
            </Grid> 
            <Grid item lg={12}>
                <Typography variant="body2">
                    Ready to commute? We recommend to use our shuttle services.
                </Typography>
            </Grid>
        </Grid>
    )
}

function StepCase1(data){
    /**
        ALABANG
        BALIBAGO
        TAGAPO
        CALAMBA
        MAYAPA
        TANAUAN
        SAN PEDRO
        PALA-PALA
        MAMATID
        PULO
    */
    const classes = useStyles();

    const route_children = [
        <ToggleButton key={1} value="Alabang">
            <Typography>
                Alabang
            </Typography>
        </ToggleButton>,
        <ToggleButton key={2} value="Balibago">
            <Typography>
                BALIBAGO
            </Typography>
        </ToggleButton>,
        <ToggleButton key={3} value="Tagapo">
            <Typography>
            TAGAPO
            </Typography>
        </ToggleButton>,
        <ToggleButton key={4} value="Calamba">
            <Typography>
            CALAMBA
            </Typography>
        </ToggleButton>,
        <ToggleButton key={5} value="Mayapa">
            <Typography>
            MAYAPA
            </Typography>
        </ToggleButton>,
        <ToggleButton key={6} value="Tanauan">
            <Typography>
            TANAUAN
            </Typography>
        </ToggleButton>,
        <ToggleButton key={7} value="San Pedro">
            <Typography>
            SANPEDRO
            </Typography>
        </ToggleButton>,
        <ToggleButton key={8} value="Pala-Pala">
            <Typography>
            PALAPALA
            </Typography>
        </ToggleButton>,
        <ToggleButton key={9} value="Mamatid">
            <Typography>
            MAMATID
            </Typography>
        </ToggleButton>,
        <ToggleButton key={10} value="Pulo">
            <Typography>
            PULO
            </Typography>
        </ToggleButton>,
        <ToggleButton key={10} value="SanFelix / Sto.Tomas">
            <Typography>
            SanFelix Sto.Tomas
            </Typography>
        </ToggleButton>,
        <ToggleButton key={10} value="Fab4">
            <Typography>
            Fab4
            </Typography>
        </ToggleButton>,
    ];

    return (
        <Grid container spacing={2} justify="center">
            <Grid item>
                <Grid container spacing={2} justify="center">
                    <Grid item>
                        <Typography component="h2" variant="h6">
                            Select incoming route:
                        </Typography>
                    </Grid>
                </Grid>
                <Typography>
                    <ToggleButtonGroup
                        size="small"
                        value={data.incomingRoute.value}
                        exclusive
                        onChange={data.incomingRoute.onChange}
                    >
                        {route_children}
                    </ToggleButtonGroup>
                </Typography>
                { 
                    data.incomingRoute.value === 'Alabang' ? 
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Alabang.PNG"
                                title="Alabang"
                            />
                        </CardContent>
                    </Card>
                    : data.incomingRoute.value === 'Balibago' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Balibago.PNG"
                                title="Balibago"
                            />
                        </CardContent>
                    </Card>
                    : data.incomingRoute.value === 'Calamba' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Calamba.PNG"
                                title="Calamba"
                            />
                        </CardContent>
                    </Card>
                    : data.incomingRoute.value === 'Fab4' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Fab4.PNG"
                                title="Fab4"
                            />
                        </CardContent>
                    </Card>
                    : data.incomingRoute.value === 'Mamatid' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Mamatid.PNG"
                                title="Mamatid"
                            />
                        </CardContent>
                    </Card>
                    : data.incomingRoute.value === 'Pala-Pala' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Pala-Pala.PNG"
                                title="Pala-Pala"
                            />
                        </CardContent>
                    </Card>
                    : data.incomingRoute.value === 'Pulo' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Pulo.PNG"
                                title="Pulo"
                            />
                        </CardContent>
                    </Card>
                    : data.incomingRoute.value === 'SanFelix / Sto.Tomas' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/San Felix.PNG"
                                title="San Felix / Sto. Tomas"
                            />
                        </CardContent>
                    </Card>
                    : data.incomingRoute.value === 'San Pedro' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/San Pedro.PNG"
                                title="San Pedro"
                            />
                        </CardContent>
                    </Card>
                    : data.incomingRoute.value === 'Tagapo' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Tagapo.PNG"
                                title="Tagapo"
                            />
                        </CardContent>
                    </Card>
                    : data.incomingRoute.value === 'Tanauan' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Tanuan.PNG"
                                title="Tanuan"
                            />
                        </CardContent>
                    </Card>
                    : data.incomingRoute.value === 'Mayapa' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Mayapa.PNG"
                                title="Mayapa"
                            />
                        </CardContent>
                    </Card>
                    :
                    <></>
                 }
            </Grid>
            <Grid item>
                <Grid container spacing={2} justify="center">
                    <Grid item>
                        <Typography component="h2" variant="h6">
                            Select outgoing route:
                        </Typography>
                    </Grid>
                </Grid>
                <Typography>
                    <ToggleButtonGroup
                        size="small"
                        value={data.outgoingRoute.value}
                        exclusive
                        onChange={data.outgoingRoute.onChange}
                    >
                        {route_children}
                    </ToggleButtonGroup>
                </Typography>
                { 
                    data.outgoingRoute.value === 'Alabang' ? 
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Alabang.PNG"
                                title="Alabang"
                            />
                        </CardContent>
                    </Card>
                    : data.outgoingRoute.value === 'Balibago' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Balibago.PNG"
                                title="Balibago"
                            />
                        </CardContent>
                    </Card>
                    : data.outgoingRoute.value === 'Calamba' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Calamba.PNG"
                                title="Calamba"
                            />
                        </CardContent>
                    </Card>
                    : data.outgoingRoute.value === 'Fab4' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Fab4.PNG"
                                title="Fab4"
                            />
                        </CardContent>
                    </Card>
                    : data.outgoingRoute.value === 'Mamatid' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Mamatid.PNG"
                                title="Mamatid"
                            />
                        </CardContent>
                    </Card>
                    : data.outgoingRoute.value === 'Pala-Pala' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Pala-Pala.PNG"
                                title="Pala-Pala"
                            />
                        </CardContent>
                    </Card>
                    : data.outgoingRoute.value === 'Pulo' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Pulo.PNG"
                                title="Pulo"
                            />
                        </CardContent>
                    </Card>
                    : data.outgoingRoute.value === 'SanFelix / Sto.Tomas' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/San Felix.PNG"
                                title="San Felix / Sto. Tomas"
                            />
                        </CardContent>
                    </Card>
                    : data.outgoingRoute.value === 'San Pedro' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/San Pedro.PNG"
                                title="San Pedro"
                            />
                        </CardContent>
                    </Card>
                    : data.outgoingRoute.value === 'Tagapo' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Tagapo.PNG"
                                title="Tagapo"
                            />
                        </CardContent>
                    </Card>
                    : data.outgoingRoute.value === 'Tanauan' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Tanuan.PNG"
                                title="Tanuan"
                            />
                        </CardContent>
                    </Card>
                    : data.outgoingRoute.value === 'Mayapa' ?
                    <Card>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image="http://dev-metaspf401.sunpowercorp.com:8080/images/Mayapa.PNG"
                                title="Mayapa"
                            />
                        </CardContent>
                    </Card>
                    :
                    <></>
                }
            </Grid>
           
        </Grid>
    )
}

function StepCase2(data){
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Registration Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item lg={6}>
                        <Typography variant="h5" component="h2">
                            {data.user.displayName}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {data.user.title}
                        </Typography>
                    </Grid>
                    <Grid item lg={6}>
                        <Typography variant="h5" component="h2">
                            {
                                data.transportation.value === 'car' ? 
                                <>
                                    <Typography variant="h5" component="h2">
                                        Car / Carpool
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        Mode of Transportation
                                    </Typography>
                                </>
                                :
                                <Grid container spacing={2}>
                                    <Grid item lg={6}>
                                        <Typography variant="h5" component="h2">
                                            {data.incomingRoute.value}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            Incoming Route
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <Typography variant="h5" component="h2">
                                            {data.outgoingRoute.value}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            Outgoing Route
                                        </Typography>
                                    </Grid>
                                </Grid>
                            }
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="body2" component="p">
                    {
                        data.transportation.value === 'car' ?
                        <>Drive Safely. Don't Drink and Drive.</>
                        :
                        <>Read our PEC for your routes pickup time.</>
                    }
                <br />
                </Typography>
            </CardContent>
        </Card>
    )
}

export default function Layout(props) {
    const classes = useStyles();
    const user = props.data;

    /** Select Transportation state */
    const transportation = useTransportation(null);
    function useTransportation(init){
        const [ value, setValue ] = useState(init);

        const handleOnChange = (e, newTranspo) => {
            setValue(newTranspo);
        }

        return {
            value,
            onChange: handleOnChange
        }
    }
    /** end transportation state */

    /** Select Incoming Route state */
    const incomingRoute = useIncomingRoute(null);

    function useIncomingRoute(init){
        const [ value, setValue ] = useState(init);

        const handleOnChange = (e, newIncoming) => {
            setValue(newIncoming);
        }
        
        return {
            value,
            onChange: handleOnChange
        }
    }
    /** end of Incoming Route state */

    /** Select Outgoing Route state */
    const outgoingRoute = useOutgoingRoute(null);

    function useOutgoingRoute(init){
        const [ value, setValue ] = useState(init);

        const handleOnChange = (e, newOutgoing) => {
            setValue(newOutgoing);
        }

        return {
            value,
            onChange: handleOnChange
        }
    }
    /** end of outgoing Route state */
    
    /** YES steppperssss  */
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const handleNext = () => {
        if (transportation.value === 'car') {
            if (activeStep !== 2) {
                setActiveStep(2);
            } else {
                setActiveStep(prevActiveStep => prevActiveStep + 1);
            }
        } else {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        if (transportation.value === 'car') {
            setActiveStep(0);
        } else {
            setActiveStep(prevActiveStep => prevActiveStep - 1);
        }
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    /** end pf YES steppperssss  */


    /** GET TICKET BUTTON --- Upload details to db ---------------------------- */
    const [ loading, setLoading ] = useState(true);

    const handleSubmit = () => {
        
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    
        (async () => {
            const res_submit = await fetch(`http://dev-metaspf401.sunpowercorp.com:8080/api/yes`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    employeeNumber: user.employeeNumber,
                    isAccepted: 1,
                    transportation: transportation.value,
                    incomingRoute: incomingRoute.value || '',
                    outgoingRoute: outgoingRoute.value || '',
                    reason: ''
                })
            });
    
            //console.log(res_submit);
    
            const content = await res_submit.json();
            
            console.log(content);
    
            if(content.success){
    
                console.log(content.success);
                setLoading(prevLoading => !prevLoading);
                
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
                        {/** IF USER IS NOT REGISTERED YET -- HINT: TOKEN */}
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Yay, Great! 
                            </Typography>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                Just a few details before you go...
                            </Typography>
                            <div className={classes.heroButtons}>
                            <Grid container spacing={1} justify="center">
                                <Grid item lg={12}>
                                    <div className={classes.root}>
                                        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                                            {steps.map(label => (
                                            <Step key={label}>
                                                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                            </Step>
                                            ))}
                                        </Stepper>
                                        <div>
                                            {activeStep === steps.length ? 
                                                <>
                                                    {
                                                        loading ?
                                                            <Grid container justify="center" spacing={6} direction="row" alignItems="center">
                                                                <Grid item>
                                                                    <CircularProgress className={classes.progress} />
                                                                </Grid>
                                                            </Grid>
                                                        :
                                                        <div>
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
                                                        </div>
                                                    }
                                                    {/* 
                                                    <div>
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
                                                    </div>
                                                    */}
                                                </>
                                                
                                                :
                                                    activeStep === 0 ?
                                                    (
                                                        <div>
                                                            <Typography className={classes.instructions} gutterBottom>{getStepContent(activeStep, transportation, incomingRoute, outgoingRoute, user)}</Typography>
                                                            {
                                                                transportation.value !== null ?
                                                                <>
                                                                    <Grid container spacing={2} 
                                                                        direction="row"
                                                                        justify="flex-end"
                                                                        alignItems="center"
                                                                    >
                                                                        <Grid item>
                                                                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                                                                Back
                                                                            </Button>
                                                                            {
                                                                                activeStep === steps.length - 1 ? 
                                                                                <>
                                                                                    <Button
                                                                                        variant="contained"
                                                                                        color="primary"
                                                                                        onClick={handleSubmit}
                                                                                        className={classes.button}
                                                                                    >   
                                                                                        {activeStep === steps.length - 1 ? 'Get Ticket' : 'Next'}
                                                                                    </Button>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <Button
                                                                                        variant="contained"
                                                                                        color="primary"
                                                                                        onClick={handleNext}
                                                                                        className={classes.button}
                                                                                    >   
                                                                                        {activeStep === steps.length - 1 ? 'Get Ticket' : 'Next'}
                                                                                    </Button>
                                                                                </>
                                                                            }
                                                                            
                                                                        </Grid>
                                                                    </Grid>
                                                                </>
                                                                : 
                                                                <></>
                                                            }
                                                            
                                                        </div>
                                                    )
                                                    :
                                                        activeStep === 1 ?
                                                        (
                                                            <div>
                                                                <Typography className={classes.instructions} gutterBottom>{getStepContent(activeStep, transportation, incomingRoute, outgoingRoute, user)}</Typography>
                                                                {
                                                                    transportation.value === 'car' ?
                                                                    <>
                                                                        <Grid container spacing={2} 
                                                                            direction="row"
                                                                            justify="flex-end"
                                                                            alignItems="center"
                                                                        >
                                                                            <Grid item>
                                                                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                                                                    Back
                                                                                </Button>
                                                                                {
                                                                                    activeStep === steps.length - 1 ? 
                                                                                    <>
                                                                                        <Button
                                                                                            variant="contained"
                                                                                            color="primary"
                                                                                            onClick={handleSubmit}
                                                                                            className={classes.button}
                                                                                        >   
                                                                                            {activeStep === steps.length - 1 ? 'Get Ticket' : 'Next'}
                                                                                        </Button>
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                        <Button
                                                                                            variant="contained"
                                                                                            color="primary"
                                                                                            onClick={handleNext}
                                                                                            className={classes.button}
                                                                                        >   
                                                                                            {activeStep === steps.length - 1 ? 'Get Ticket' : 'Next'}
                                                                                        </Button>
                                                                                    </>
                                                                                }
                                                                            </Grid>
                                                                        </Grid>
                                                                    </>
                                                                    :
                                                                    transportation.value === 'shuttle' ?
                                                                        incomingRoute.value !== null && outgoingRoute.value !== null ?
                                                                            <>
                                                                                <Grid container spacing={2} 
                                                                                    direction="row"
                                                                                    justify="flex-end"
                                                                                    alignItems="center"
                                                                                >
                                                                                    <Grid item>
                                                                                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                                                                            Back
                                                                                        </Button>
                                                                                        {
                                                                                            activeStep === steps.length - 1 ? 
                                                                                            <>
                                                                                                <Button
                                                                                                    variant="contained"
                                                                                                    color="primary"
                                                                                                    onClick={handleSubmit}
                                                                                                    className={classes.button}
                                                                                                >   
                                                                                                    {activeStep === steps.length - 1 ? 'Get Ticket' : 'Next'}
                                                                                                </Button>
                                                                                            </>
                                                                                            :
                                                                                            <>
                                                                                                <Button
                                                                                                    variant="contained"
                                                                                                    color="primary"
                                                                                                    onClick={handleNext}
                                                                                                    className={classes.button}
                                                                                                >   
                                                                                                    {activeStep === steps.length - 1 ? 'Get Ticket' : 'Next'}
                                                                                                </Button>
                                                                                            </>
                                                                                        }
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </>
                                                                        :
                                                                        <>
                                                                            <Grid container spacing={2} 
                                                                                direction="row"
                                                                                justify="flex-end"
                                                                                alignItems="center"
                                                                            >
                                                                                <Grid item>
                                                                                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                                                                        Back
                                                                                    </Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </>
                                                                        
                                                                    :
                                                                    <></>
                                                                }
                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            <div>
                                                                <Typography className={classes.instructions} gutterBottom>{getStepContent(activeStep, transportation, incomingRoute, outgoingRoute, user)}</Typography>
                                                                {
                                                                    transportation.value !== '' ?
                                                                    <>
                                                                        <Grid container spacing={2} 
                                                                            direction="row"
                                                                            justify="flex-end"
                                                                            alignItems="center"
                                                                        >
                                                                            <Grid item>
                                                                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                                                                    Back
                                                                                </Button>
                                                                                {
                                                                                    activeStep === steps.length - 1 ? 
                                                                                    <>
                                                                                        <Button
                                                                                            variant="contained"
                                                                                            color="primary"
                                                                                            onClick={handleSubmit}
                                                                                            className={classes.button}
                                                                                        >   
                                                                                            {activeStep === steps.length - 1 ? 'Get Ticket' : 'Next'}
                                                                                        </Button>
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                        <Button
                                                                                            variant="contained"
                                                                                            color="primary"
                                                                                            onClick={handleNext}
                                                                                            className={classes.button}
                                                                                        >   
                                                                                            {activeStep === steps.length - 1 ? 'Get Ticket' : 'Next'}
                                                                                        </Button>
                                                                                    </>
                                                                                }
                                                                            </Grid>
                                                                        </Grid>
                                                                    </>
                                                                    : 
                                                                    <></>
                                                                }
                                                                
                                                            </div>
                                                        )

                                            }

                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            </div>
                        </>
                    : props.data.participated[0].isAccepted === 1 ? /** IF USER ACCEPTED THE INVITATION AND REGISTERED */
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
                    : props.data.participated[0].isAccepted === 0 ? /** IF USER DECLINED THE INVITATION AND REGISTERED */
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