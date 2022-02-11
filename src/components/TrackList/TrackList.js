import axios from 'axios'
import { useState } from 'react'
import { Loader } from '../Loader'
import { TrackCard } from '../TrackCard'
import './TrackList.css'

const TrackList = () => {
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [trackList, setTrackList] = useState([{}])

  const handleSearch = () => {
    setLoading(true)
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=track:"${searchTerm}"`
      )
      .then((response) => {
        const newTrackList = response.data.data.map((track) => {
          const {
            id,
            title,
            duration,
            album: { cover: albumArtPath, title: album },
            artist: { name: artist, id: artistId },
          } = track
          return {
            id,
            title,
            duration: `${Math.floor(duration / 60)}:${
              duration - Math.floor(duration / 60) * 60
            }`,
            album,
            albumArtPath,
            artist,
            artistId,
          }
        })
        setTrackList(newTrackList)
        setLoading(false)
      })
      .catch(() => {
        setTrackList([])
        setLoading(false)
      })
  }

  if (loading) {
    if (loading) {
      return <Loader />
    }
  }

  return (
    <div>
      <div className="search-bar-container">
        <div className="search-text">
          <h1>Deezer app example</h1>
          <p>Search for a track below</p>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {trackList.length > 0 ? (
        <div className="tracks-container">
          {trackList.map((track) => {
            const {
              id,
              title,
              artist,
              artistId,
              duration,
              album,
              albumArtPath,
            } = track
            return (
              title !== undefined && (
                <TrackCard
                  id={id}
                  title={title}
                  artist={artist}
                  artistId={artistId}
                  duration={duration}
                  album={album}
                  albumArtPath={albumArtPath}
                />
              )
            )
          })}
        </div>
      ) : (
        'Sorry there were no tracks for your search'
      )}
    </div>
  )
}

export { TrackList }
