import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AlbumListing } from '../AlbumListing'
import { Loader } from '../Loader'
import { TrackCard } from '../TrackCard'
import './Artist.css'

const Artist = () => {
  const [loading, setLoading] = useState(true)
  const [artistName, setArtistName] = useState('')
  const [fanCount, setFanCount] = useState(0)
  const [topFiveTracks, setTopFiveTracks] = useState([])
  const [albums, setAlbums] = useState([])
  const [artistImagePath, setArtistImagePath] = useState('')

  const params = useParams()

  const getArtistDetails = () => {
    setLoading(true)
    const getArtistBasicInfo = axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${params.id}`
    )
    const getArtistTopTracks = axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${params.id}/top`
    )
    const getArtistAlbums = axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${params.id}/albums`
    )

    Promise.all([getArtistBasicInfo, getArtistTopTracks, getArtistAlbums])
      .then((response) => {
        console.log(response[0].data)
        const {
          id,
          name: artistName,
          nb_fan: fanCount,
          picture_big: artistImagePath,
        } = response[0].data
        setArtistName(artistName)
        setFanCount(fanCount)
        setArtistImagePath(artistImagePath)

        const newTrackList = response[1].data.data.map((track) => {
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
        setTopFiveTracks(newTrackList)

        const newAlbums = response[2].data.data.map((currentAlbum) => {
          const {
            id,
            title,
            cover_medium: imagePath,
            release_date: albumDate,
          } = currentAlbum

          return {
            id,
            title,
            imagePath,
            albumDate,
          }
        })
        setAlbums(newAlbums)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getArtistDetails()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <div className="search-bar-container">
        <img src={artistImagePath} alt="" />
        <div className="search-text">
          <h1>
            {artistName} has {fanCount} fans
          </h1>
        </div>
      </div>

      <div className="tracks-container artist-tracks">
        <h2>{artistName}'s Top 5 tracks</h2>
        {topFiveTracks.map((track) => {
          const { id, title, artist, artistId, duration, album, albumArtPath } =
            track
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

      <div className="tracks-container">
        <h2>{artistName}'s Albums</h2>
        {albums.map((currentAlbum) => {
          const { id, title, imagePath, albumDate } = currentAlbum
          return (
            <AlbumListing
              id={id}
              title={title}
              imagePath={imagePath}
              albumDate={albumDate}
            />
          )
        })}
      </div>
    </div>
  )
}

export { Artist }
