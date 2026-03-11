import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './pages/Users';
import Posts from './pages/Posts';
import { Routes, Route } from 'react-router-dom';
import Comments from './pages/Comments';
import ToDos from './pages/ToDos';
import './App.css';

function App() {
  return (
      <Routes>
        <Route path="/comments/:userId/:postId" element={<Comments />} />
        <Route path="/" element={<Users />} />
        <Route path="/posts/:userId" element={<Posts />} />
        <Route path="/todos/:userId"  element={<ToDos/>} />
      </Routes>

  );
}

export default App;
