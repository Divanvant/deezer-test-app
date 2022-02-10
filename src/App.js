import axios from 'axios'
import { useState } from 'react'
import { TrackCard } from './components/TrackCard'
import './App.css'

function App() {
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
            artist: { name: artist },
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
    return (
      <div className="loading-screen">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38" width={80}>
          <defs>
            <linearGradient
              x1="8.042%"
              y1="0%"
              x2="65.682%"
              y2="23.865%"
              id="a"
            >
              <stop stopColor="#000" stopOpacity="0" offset="0%" />
              <stop stopColor="#000" stopOpacity=".631" offset="63.146%" />
              <stop stopColor="#000" offset="100%" />
            </linearGradient>
          </defs>
          <g transform="translate(1 1)" fill="none" fillRule="evenodd">
            <path
              d="M36 18c0-9.94-8.06-18-18-18"
              stroke="url(#a)"
              strokeWidth="2"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.9s"
                repeatCount="indefinite"
              />
            </path>
            <circle fill="#000" cx="36" cy="18" r="1">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.9s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>
      </div>
    )
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
            const { id, title, artist, duration, album, albumArtPath } = track
            return (
              title !== undefined && (
                <TrackCard
                  id={id}
                  title={title}
                  artist={artist}
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

export default App
