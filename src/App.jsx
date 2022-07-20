import React, { useState, useEffect } from 'react'

import Player from './Player'

import * as CONF from '../config'

const App = () => {
	const CLIENT_ID = CONF.SPOTIFY_CLIENT_ID
	const REDIRECT_URI = CONF.REDIRECT_URI
	const AUTH_ENDPOINT = CONF.AUTH_ENDPOINT
	const RESPONSE_TYPE = CONF.RESPONSE_TYPE

	const scopes = [
		'user-top-read'
	]
	
	const [token, setToken] = useState(null)

	useEffect( () => {
		const hash = window.location.hash
		let token = window.localStorage.getItem('token')

		if (!token && hash) {
			token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]
			window.location.hash = ''
			window.localStorage.setItem('token', token)
		}
		setToken(token)
	}, [])

	return (
		<div className={'w-full h-screen bg-gray-900 flex justify-center items-center'}>
			{!token && <a className={'px-4 py-3 bg-gradient-to-br from-teal-300 to-green-400 rounded-full text-white text-sm tracking-wide font-bold uppercase hover:-translate-y-1 hover:origin-center hover:rotate-2'} href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes.join('%20')}`}>Login with Spotify</a> }
			{token && <Player token={token} />}
		</div>
	)
}

export default App