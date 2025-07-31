import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Jobs from './pages/Jobs';
import Tracker from './pages/Tracker';
import Search from './pages/Search';


export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/jobs" element={<Jobs />} />
       
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/search" element={<Search />} />
        
      </Routes>
    </Router>
  );
}