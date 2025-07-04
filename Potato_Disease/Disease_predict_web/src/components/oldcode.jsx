import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminPosts from './components/AdminPosts';
import PostsList from './components/PostList';
import ImageUploader from './components/ImageUploader';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-10">
        <h1 className="text-3xl font-bold mb-4">🌿 Plant Disease Predictor</h1>
        <ImageUploader />

        {/* <nav style={{ marginBottom: '20px' }}>
          <Link to="/">home</Link>  <Link to="/admin">admin</Link>
        </nav> */}

        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/admin" element={<AdminPosts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
