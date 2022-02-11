import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Artist } from './components/Artist'
import { TrackList } from './components/TrackList'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/" element={<TrackList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
