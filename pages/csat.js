import React, {Fragment, useState} from 'react'
import Head from 'next/head'
import CSATLayout from '../components/CSATLayout'
import PropTypes from 'prop-types';

import clsx from 'clsx';

import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import { withAuthSync, logout } from '../utils/auth'
import getHost from '../utils/get-host'

import { useRouter } from 'next/router'


import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';


import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
      padding: theme.spacing(1),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
  },
  autoHeight: {
      height: 'auto',
  },
  paperSpace: {
      marginTop: 0,
      marginLeft: 10,
      marginRight: 10
  },
  actions : {
      marginTop: 10
  }
}));


const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
  success: {
      backgroundColor: green[600],
  },
  error: {
      backgroundColor: theme.palette.error.dark,
  },
  info: {
      backgroundColor: theme.palette.primary.main,
  },
  warning: {
      backgroundColor: amber[700],
  },
  icon: {
      fontSize: 20,
  },
  iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
  },
  message: {
      display: 'flex',
      alignItems: 'center',
  },
}));


function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
      <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
          <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
          </span>
      }
      action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
          </IconButton>,
      ]}
      {...other}
      />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

function Modal({ bid, onCloseModal, openModal, onSubmitModal, question_1, question_2, question_3 }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <Dialog
          fullScreen={fullScreen}
          open={openModal}
          onClose={onCloseModal}
          aria-labelledby="responsive-dialog-title"
      >
          <DialogTitle id="responsive-dialog-title">
              {"Submit your rating for "}
              <Typography variant="inherit" color="primary">
                  {bid}
              </Typography>
          </DialogTitle>
          <DialogContent>
          <DialogContentText>
                {
                  question_1.value > 1 ?
                    <Typography variant={"h6"}>
                    1.) {question_1.value} stars rating
                    </Typography>
                  :
                    <Typography variant={"h6"}>
                    1.) {question_1.value} star rating
                    </Typography>
                }
                {
                  question_2.value > 1 ?
                    <Typography variant={"h6"}>
                    2.) {question_2.value} stars rating
                    </Typography>
                  :
                    <Typography variant={"h6"}>
                    2.) {question_2.value} star rating
                    </Typography>
                }
                {
                  question_3.value > 1 ?
                    <Typography variant={"h6"}>
                    3.) {question_3.value} stars rating
                    </Typography>
                  :
                    <Typography variant={"h6"}>
                    3.) {question_3.value} star rating
                    </Typography>
                }
              <Typography variant={"h6"}>Are you sure you want to continue?</Typography>
          </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button variant={"contained"} color={"primary"} onClick={onCloseModal} >
              Cancel
          </Button>
          <Button type="submit" variant={"outlined"} onClick={() => onSubmitModal({ bid: bid })} color="primary" autoFocus style={{}}>
              Yes
          </Button>
          {/**
           
          <form onSubmit={(e) => onSubmitModal({ booking_id, uid })}>
              <Button type="submit" onClick={onCloseModal} color="text" autoFocus style={{}}>
                  Delete Prebooked
              </Button>
          </form>
          */}
          </DialogActions>
      </Dialog>
  )
}

function Index(props){
  
  const classes = useStyles();

  const [ modal, setModal ] = useState({ bid: "", openModal: false });
  const [ isResponseReserveSuccess, setIsResponseReserveSuccess ] = useState(false);
  const [openSuccessSnackBar, setSuccessOpenSnackBar] = useState(false); // response ng handleOnSubmit
  const [openErrorSnackBar, setErrorOpenSnackBar] = useState(false); // response ng handleOnSubmit
  const [ successMessageSnackBar, setSuccessMessageSnackBar ] = useState('');
  const [ errorMessageSnackBar, setErrorMessageSnackBar ] = useState('');

  const question_1 = useQuestion(0);
  const question_2 = useQuestion(0);
  const question_3 = useQuestion(0);
  const recommendation = useRecommendation("");
  
  const router = useRouter();

  function useQuestion(init) {
      const [ value, setValue ] = useState(init);
      
      function handleOnChange(e, newValue){
          setValue(newValue);
      }

      return {
          value,
          onChange: handleOnChange
      }
  }

  function useRecommendation(init){
      const [ value, setValue ] = useState(init);

      function handleOnChange(e){
          setValue(e.target.value);
      }

      return {
          value,
          onChange: handleOnChange
      }
  }

  // SnackBarrrr
  function handleSuccessClose(event, reason) {
      if (reason === 'clickaway') {
      return;
      }

      setSuccessOpenSnackBar(false);
  }

  function handleErrorClose(event, reason) {
      if (reason === 'clickaway') {
      return;
      }

      setErrorOpenSnackBar(false);
  }

  // MODALLLL
  const handleClickOpen = ({ bid }) => {
      //setOpenDelete(true);
      setModal({ bid, openModal: true });
  }

  const handleClose = () => {
      setModal({ openModal: false });
  }

  const handleSubmit = ({ bid }) => {
      setModal({ bid, openModal: false });

      (async () => {
          const res_submit = await fetch(`http://dev-metaspf401.sunpowercorp.com:8080/api/csatsurvey`, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  sid: router.query.sid,
                  bn: modal.bid,
                  bid: router.query.bid,
                  question_1: question_1.value,
                  question_2: question_2.value,
                  question_3: question_3.value,
                  recommendation: recommendation.value
              })
          });

          const content = await res_submit.json();
          
          //console.log(content);

          if(content.success){

              let loadStatusPage = `/thankyou`;
              let asStatusPage = `/thankyou`;

              setSuccessOpenSnackBar(true);
              setIsResponseReserveSuccess(true);
              setSuccessMessageSnackBar(content.success);
              
              setTimeout(() => {
                Router.push(loadStatusPage, asStatusPage);
              }, 3000);
              

          } else if(content.error){

            // error snackbar here...
            setErrorOpenSnackBar(true);
            setErrorMessageSnackBar(content.error)

          }

      })();
  }
  
    return (
        <Fragment>
            <Head>
                <title>CSAT Survey</title>
            </Head>
            <CSATLayout data={props.data} bid={router.query.bid} sid={router.query.sid} bn={router.query.bn} question_1={question_1} question_2={question_2} question_3={question_3} recommendation={recommendation} handleClickOpen={handleClickOpen} />
             <Modal {...modal} onCloseModal={handleClose} onSubmitModal={handleSubmit} question_1={question_1} question_2={question_2} question_3={question_3} />
              {
                openSuccessSnackBar ?
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleSuccessClose}
                >
                    <MySnackbarContentWrapper
                        onClose={handleSuccessClose}
                        variant="success"
                        message={successMessageSnackBar}
                    />
                </Snackbar>
                : <></>
              }
              {
                openErrorSnackBar ? 
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleErrorClose}
                >
                    <MySnackbarContentWrapper
                        onClose={handleErrorClose}
                        variant="error"
                        className={classes.margin}
                        message={errorMessageSnackBar}
                    />
                </Snackbar>
                : <></>
              }
        </Fragment>
    )
}

/**
Index.getInitialProps = async ctx => {
    const { token }  = nextCookie(ctx)
    const apiUrl = getHost(ctx.req) + '/api/index'
  
    const redirectOnError = () =>
      typeof window !== 'undefined'
        ? Router.push('/login')
        : ctx.res.writeHead(302, { Location: '/login' }).end()
  
    try {
      const response = await fetch(apiUrl, {
        credentials: 'include',
        headers: {
          Authorization: JSON.stringify({ token })
        }
      });
  
      //console.log(response.statusText);
  
      if (response.statusText === 'OK') {
        const js = await response.json()
        //console.log('js', js)
        return js
      } else {
        // https://github.com/developit/unfetch#caveats
        return await redirectOnError()
      }
    } catch (error) {
      // Implementation or Network error
      return redirectOnError()
    }
  }
  

export default withAuthSync(Index)

 */

export default Index;