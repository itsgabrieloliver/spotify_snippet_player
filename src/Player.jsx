import React, { useState, useRef } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'

const Player = ({token}) => {
	const spotifyApi = new SpotifyWebApi()
	spotifyApi.setAccessToken(token)

	const [currentTrackPreviewUrl, setCurrentTrackPreviewUrl] = useState(null)
	const [playing, setPlaying] = useState(false)

	const handlePlayButtonClicked = (e) => {
		e.preventDefault()
		spotifyApi.getMyDevices()
			.then((data) => {
				if (data.devices.length === 0) {
					return console.error('There are no active devices, open spotify.')
				}

				spotifyApi.play()
					.then(() => {
						spotifyApi.getMyCurrentPlayingTrack()
							.then((data) => {
								setPlaying(true)
								setCurrentTrackPreviewUrl(data.item.preview_url)
							})
					})
			})
	}
	const handlePauseButtonClicked = (e) => {
		e.preventDefault()
		spotifyApi.pause()
			.then(() => {
					setCurrentTrackPreviewUrl(null)
					setPlaying(false)
			}, (err) => {
				setPlaying(true)
				console.error(err)
			})
	}

	const handleNextTrackButtonClicked = (e) => {
		e.preventDefault()

		spotifyApi.pause()
			.then(() => {
				setCurrentTrackPreviewUrl(null)
				spotifyApi.skipToNext()
					.then(() => {
						setTimeout(() => {
							spotifyApi.getMyCurrentPlayingTrack()
								.then((data) => {
									setCurrentTrackPreviewUrl(data.item.preview_url)
								})
						}, 400)
					})
			})
	}

	return (
		<div className={'flex items-center text-white'}>
			{
				currentTrackPreviewUrl &&
				<audio autoPlay>
					<source src={currentTrackPreviewUrl} />
				</audio>
			}
			{
				playing &&
				<button onClick={handleNextTrackButtonClicked} className={'uppercase font-bold text-sm'}>Next Track</button>

			}
			{
				playing &&
				<button className={'ml-2 uppercase font-bold text-sm underline underline-offset-4'} onClick={handlePauseButtonClicked}>Pause</button>
			}
			{
				!playing &&
				<button className={'ml-2 uppercase font-bold text-sm underline underline-offset-4'} onClick={handlePlayButtonClicked}>Play</button>
			}

		</div>
	)
}

export default Player