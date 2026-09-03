import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Post from './pages/Post'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import { BookingProvider } from './context/BookingContext'
import BookingModal from './components/BookingModal'

export default function App() {
  return (
    <BookingProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Post />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BookingModal />
    </BookingProvider>
  )
}
