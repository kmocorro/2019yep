import React, {Fragment, useState} from 'react'
import Head from 'next/head'
import ThankyouLayout from '../components/ThankyouLayout'
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

function ThankYou(props){
  
  const classes = useStyles();

    return (
        <Fragment>
            <Head>
                <title>CSAT Survey</title>
            </Head>
            
            <ThankyouLayout />
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

export default ThankYou;