import React from 'react'

const TrackCard = ({
  id,
  title,
  artist,
  artistId,
  duration,
  album,
  albumArtPath,
}) =>
  title !== undefined && (
    <a href={`/artist/${artistId}`} className="track" key={id}>
      <img src={albumArtPath} alt={title} />
      <div className="track-details">
        <div className="title-container">
          <h3>{title}</h3>
          <span>{duration}</span>
        </div>
        <h4>{artist}</h4>
        <p className="album-name">{album}</p>
      </div>
    </a>
  )

export { TrackCard }
