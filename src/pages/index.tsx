import React, {useEffect, useState} from 'react'
import type {NextPage} from 'next'

import {useRouter} from 'next/router'
import Head from 'next/head'

import * as CONF from '../../config/config'
import {AnchorButtonGradientGB} from '../components/Button/Button'

const Home: NextPage = () => {
    // Stores functionality of useRouter hook inside router variable.
    const router = useRouter()

    // Defines home states.
    const [accessToken, setAccessToken] = useState<string | null>(null)

    // Fetch Spotify Web Api authorization credentials from config file.
    let CLIENT_ID = CONF.CLIENT_ID
    let REDIRECT_URI = CONF.REDIRECT_URI
    let AUTH_ENDPOINT = CONF.AUTH_ENDPOINT
    let RESPONSE_TYPE = CONF.RESPONSE_TYPE

    // Define scopes to be used when generating client token.
    const scopes = [
        'user-top-read'
    ]

    useEffect(() => {
        // Defines our hash and token initially.
        const hash: string = window.location.hash
        let token: any = window.localStorage.getItem('token')

        // If there is no token, but there is a URI hash
        // ... it'll save the token into the local storage.
        if (!token && hash) {
            // @ts-ignore
            token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]
            window.location.hash = ''
            window.localStorage.setItem('token', token)
        }

        if (token) {
            router.push('/player')
        }

        // Sets the accessToken state to the token value.
        setAccessToken(token)
    }, [])

    return (
        <>
            <Head>
                <title>Top Song Player - Sign In With Spotify</title>
            </Head>
            <div className={'w-full h-screen bg-gray-900 flex justify-center items-center'}>
                {!accessToken && <AnchorButtonGradientGB
                    href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes.join('%20')}`}>Login
                    with Spotify</AnchorButtonGradientGB>}
            </div>
        </>
    )
}

export default Home