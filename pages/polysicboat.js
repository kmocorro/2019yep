import React, {Fragment} from 'react'
import Head from 'next/head'
import PolySiCBoatLayout from '../components/PolySiCBoatLayout'

import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import { withAuthSync, logout } from '../utils/auth'
import getHost from '../utils/get-host'

function PolyWTS(props){
    return (
        <Fragment>
            <Head>
                <title>Poly SiC Boat Traceability</title>
            </Head>
            <PolySiCBoatLayout data={props.data}>

            </PolySiCBoatLayout>
        </Fragment>
    )
}

PolyWTS.getInitialProps = async ctx => {
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
  

export default withAuthSync(PolyWTS)