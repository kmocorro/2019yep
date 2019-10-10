import React, {Fragment, useState} from 'react'
import Head from 'next/head'
import RecertIndexLayout from '../components/RecertIndexLayout'

import Router, { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import { withAuthSync, logout } from '../utils/auth'
import getHost from '../utils/get-host'

import RecertExamPage from '../components/RecertExamPage'

function Exam(props){
    const router = useRouter();

  return (
      <Fragment>
        <Head>
            <title>{router.query.e} - {router.query.p} Process Recertification</title>
        </Head>
        <RecertExamPage/>
      </Fragment>
  )
}

Exam.getInitialProps = async ctx => {
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
  

export default withAuthSync(Exam)