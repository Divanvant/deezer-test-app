import React from 'react'

const AlbumListing = ({ id, title, imagePath, albumDate }) => (
  <div className="track" key={id}>
    <img src={imagePath} alt={title} />
    <div className="track-details">
      <h3>{title}</h3>
      <p>{albumDate}</p>
    </div>
  </div>
)

export { AlbumListing }
