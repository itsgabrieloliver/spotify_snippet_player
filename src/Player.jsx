import React, { useState } from 'react'

import Track from './Track'

const Player = ({token, userId}) => {
	const [currentTrackPreviewUrl, setCurrentTrackPreviewUrl] = useState(null)
	const [currentTrackName, setCurrentTrackName] = useState(null)
	const [currentTrackImageUrl, setCurrentTrackImageUrl] = useState(null)
	const [currentTrackArtists, setCurrentTrackArtists] = useState(null)
	const [playing, setPlaying] = useState(false)
	const [index, setIndex] = useState(0)

	const handlePlayButtonClicked = (e) => {
		e.preventDefault()
		fetch(`https://api.spotify.com/v1/me/player/recently-played?access_token=${token}`, {
			method: 'GET'
		})
			.then((res) => res.json())
			.then((data) => {
				setCurrentTrackPreviewUrl(data.items[index].track.preview_url)
				setCurrentTrackArtists(data.items[index].track.artists)
				setCurrentTrackName(data.items[index].track.name)
				setCurrentTrackImageUrl(data.items[index].track.album.images[0].url)
				setPlaying(true)
				setIndex(index + 1)
			})
	}

	const handlePauseButtonClicked = (e) => {
		e.preventDefault()
		setCurrentTrackPreviewUrl(null)
		setCurrentTrackName(null)
		setCurrentTrackImageUrl(null)
		setCurrentTrackArtists(null)
		setPlaying(false)
	}

	const handleNextTrackButtonClicked = (e) => {
		e.preventDefault()
		setCurrentTrackPreviewUrl(null)
		fetch(`https://api.spotify.com/v1/me/player/recently-played?access_token=${token}`, {
			method: 'GET'
		})
			.then((res) => res.json())
			.then((data) => {
				setCurrentTrackPreviewUrl(data.items[index].track.preview_url)
				setCurrentTrackArtists(data.items[index].track.artists)
				setCurrentTrackName(data.items[index].track.name)
				setCurrentTrackImageUrl(data.items[index].track.album.images[0].url)
				setIndex(index + 1)
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