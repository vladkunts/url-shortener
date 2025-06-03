import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.tsx';
import List from './pages/List';
import Details from './pages/Details';

function App() {
  return (
      <Router>
        <nav>
          <Link to="/">Create</Link>
          <Link to="/list">All URLs</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/details/:alias" element={<Details />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Router>
  );
}

export default App;