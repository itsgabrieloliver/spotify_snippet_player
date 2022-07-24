import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { NextTrackControlButton, PlayPauseControlButton } from '../components/Button/Button'

const Player: NextPage = () => {
    // Defines player states.
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [currentTrack, setCurrentTrack] = useState<any>(null)
    const [trackIndex, setTrackIndex] = useState<number>(0)

    // Stores functionality of useRouter hook inside router variable.
    const router = useRouter()

    // When Home component loads, it'll confirm there is a token
    // ... in local storage. If not, it'll redirect to sign-in page.
    useEffect(() => {
        let accessToken = window.localStorage.getItem('token')
        if (!accessToken) {
            console.log('no access token')
            router.push('/')
        }
        setAccessToken(accessToken)
    }, [])

    // Function to play a track.
    const handlePlayTrack = (e: any) => {
        e.preventDefault()
        setCurrentTrack(null)
        fetch(`https://api.spotify.com/v1/me/top/tracks`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setCurrentTrack(data.items[trackIndex])
                setTrackIndex(trackIndex + 1)
            })
        setIsPlaying(true)
    }

    // Function to pause a track.
    const handlePauseTrack = (e: any) => {
        e.preventDefault()
        setTrackIndex(0)
        setCurrentTrack(null)
        setIsPlaying(false)
    }

    // Function to change the track.
    const handleNextTrack = (e: any) => {
        e.preventDefault()
        setCurrentTrack(null)
        fetch(`https://api.spotify.com/v1/me/top/tracks`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setCurrentTrack(data.items[trackIndex])
                setTrackIndex(trackIndex + 1)
            })
        setIsPlaying(true)


    }

    return (
        <div className={'w-full h-screen bg-gray-900 flex justify-center items-center'}>
            {
                !currentTrack &&
                <Head>
                    <title>Player - Play a Song</title>
                </Head>
            }
            {
                currentTrack &&
                <>
                    <Head>
                        <title>Currently Playing: {currentTrack.name}</title>
                    </Head>
                    <audio autoPlay={true} loop>
                        <source src={currentTrack.preview_url} type={'audio/mp3'}/>
                    </audio>
                </>
            }
            {
                !isPlaying &&
                <PlayPauseControlButton onClick={handlePlayTrack} children={'Play'} />
            }
            {
                isPlaying && currentTrack &&
                <div className={'flex flex-col'}>
                    <div className={'flex flex-col'}>
                        <img src={currentTrack.album.images[0].url} alt={currentTrack.name} className={'w-96 h-96'} />
                        <h3 className={'mt-3 text-xl font-bold text-white'}>{currentTrack.name}</h3>
                        <div className={'mb-3 flex'}>
                            {
                                currentTrack.artists.map((artist: any, index: number) => {
                                    return (
                                        <p key={index} className={'text-xs font-bold text-white mr-2'}>{artist.name}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={'mt-3 flex items-center justify-center'}>
                        <PlayPauseControlButton onClick={handlePauseTrack} children={'Pause'} />
                        <span className={'mx-1'}></span>
                        <NextTrackControlButton onClick={handleNextTrack} children={'Next Track'}/>
                    </div>
                </div>

            }
        </div>
    )
}

export default Player