import React, { useState } from 'react'

import Track from './Track'

const Player = ({token, userId}) => {
	const [currentTrackPreviewUrl, setCurrentTrackPreviewUrl] = useState(null)
	const [currentTrackName, setCurrentTrackName] = useState(null)
	const [currentTrackImageUrl, setCurrentTrackImageUrl] = useState(null)
	const [currentTrackArtists, setCurrentTrackArtists] = useState(null)
	const [playing, setPlaying] = useState(false)
	const [tracks, setTracks] = useState(null)
	const [trackIndex, setTrackIndex] = useState(0)

	const handlePlayButtonClicked = (e) => {
		e.preventDefault()
		setTrackIndex(0)
		fetch(`https://api.spotify.com/v1/me/top/tracks`, {
			method: 'GET',
			withCredentials: true,
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				setCurrentTrackPreviewUrl(data.items[trackIndex].preview_url)
				setCurrentTrackArtists(data.items[trackIndex].artists)
				setCurrentTrackName(data.items[trackIndex].name)
				setCurrentTrackImageUrl(data.items[trackIndex].album.images[0].url)
				setTrackIndex(trackIndex + 1)
				setPlaying(true)
			})
	}

	const handlePauseButtonClicked = (e) => {
		e.preventDefault()
		setTrackIndex(0)
		setCurrentTrackPreviewUrl(null)
		setCurrentTrackName(null)
		setCurrentTrackImageUrl(null)
		setCurrentTrackArtists(null)
		setPlaying(false)
	}

	const handleNextTrackButtonClicked = (e) => {
		e.preventDefault()
		setCurrentTrackPreviewUrl(null)
		fetch(`https://api.spotify.com/v1/me/top/tracks`, {
			method: 'GET',
			withCredentials: true,
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				setCurrentTrackPreviewUrl(data.items[trackIndex].preview_url)
				setCurrentTrackArtists(data.items[trackIndex].artists)
				setCurrentTrackName(data.items[trackIndex].name)
				setCurrentTrackImageUrl(data.items[trackIndex].album.images[0].url)
				setTrackIndex(trackIndex + 1)
			})

	}

	return (
		<div className={'flex flex-col items-center text-white'}>
			{
				currentTrackPreviewUrl &&
				<audio autoPlay>
					<source src={currentTrackPreviewUrl} />
				</audio>
			}
			{
				currentTrackImageUrl && <Track name={currentTrackName} image_url={currentTrackImageUrl} artists={currentTrackArtists} />
			}
			<div className={'mt-5 flex'}>
				{
					playing &&
					<button className={'mr-2 uppercase font-bold text-sm underline underline-offset-4'} onClick={handlePauseButtonClicked}>Pause</button>
				}
				{
					!playing &&
					<button className={'mr-2 uppercase font-bold text-sm underline underline-offset-4'} onClick={handlePlayButtonClicked}>Play</button>
				}
				{
					playing &&
					<button onClick={handleNextTrackButtonClicked} className={'uppercase font-bold text-sm'}>Next Track</button>

				}
			</div>

		</div>
	)
}

export default Player