import React, { useState, useEffect } from 'react'

import Player from './Player'

const App = () => {
	const CLIENT_ID = '9d32130a4f3b4402b73b5d55566fca05'
	const REDIRECT_URI = 'http://localhost:3000'
	const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
	const RESPONSE_TYPE = 'token'

	const scopes = [
		'user-modify-playback-state',
		'user-read-playback-state',
		'user-read-email',
		'user-read-recently-played',
		'user-top-read'
	]

	const [token, setToken] = useState(null)
	const [userId, setUserId] = useState(null)

	useEffect( () => {
		const hash = window.location.hash
		let token = window.localStorage.getItem('token')

		if (!token && hash) {
			token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]
			window.location.hash = ''
			window.localStorage.setItem('token', token)
		}
		setToken(token)
		fetch(`https://api.spotify.com/v1/me?access_token=${token}`, {
			method: 'GET'
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				setUserId(data.id)
			})
	}, [])

	return (
		<div className={'w-full h-screen bg-gray-900 flex justify-center items-center'}>
			{!token && <a className={'px-4 py-3 bg-gradient-to-br from-teal-300 to-green-400 rounded-full text-white text-sm tracking-wide font-bold uppercase hover:-translate-y-1 hover:origin-center hover:rotate-2'} href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes.join('%20')}`}>Login with Spotify</a> }
			{token && <Player token={token} userId={userId} />}
		</div>
	)
}

export default App