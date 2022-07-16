import React from 'react'

const Track = ({name, image_url, artists}) => {
	return (
		<div>
			<img src={image_url} alt={name + ' Cover Image'}/>
			<h1 className={'mt-2 text-xl font-semibold'}>{name}</h1>
			<div className={'flex font-thin'}>
				{
					artists.map((artist, index) => {
						return (
							<h1 key={index} className={'mr-3'}>{artist.name}</h1>
						)
					})
				}
			</div>
		</div>
	)
}

export default Track