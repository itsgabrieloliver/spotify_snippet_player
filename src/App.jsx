import React, { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import Player from './Player'

const App = () => {
	const CLIENT_ID = '21641a9f36574b7a878a7ec5b773fd59'
	const REDIRECT_URI = 'http://localhost:3000'
	const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
	const RESPONSE_TYPE = 'token'

	const [token, setToken] = useState(null)

	const spotifyApi = new SpotifyWebApi()

	useEffect(() => {
		const hash = window.location.hash
		let token = window.localStorage.getItem('token')

		if (!token && hash) {
			token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]
			window.location.hash = ''
			window.localStorage.setItem('token', token)
		}
		setToken(token)
		spotifyApi.setAccessToken(token)
	}, [])

	return (
		<div className={'w-full h-screen bg-gray-900 flex justify-center items-center'}>
			{!token && <a className={'px-4 py-3 bg-gradient-to-br from-teal-300 to-green-400 rounded-full text-white text-sm tracking-wide font-bold uppercase hover:-translate-y-1 hover:origin-center hover:rotate-2'} href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login with Spotify</a> }
			{token && <Player token={token} />}
		</div>
	)
}

export default App