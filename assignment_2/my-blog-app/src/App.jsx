// const [dislikes, setdislikes] = React.useState(0);
// <button onClick={() => setdislikes(dislikes + 1)}>💔 {dislikes} Dislikes</button>

import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ContactForm from "./ContactForm";

const initialPosts = [
  { id: 1, title: "The Future of Single-Page Apps", author: "A. Developer", content: "Exploring how modern frameworks and clever state management make complex single-page applications fast, scalable, and a joy to maintain.", date: "2024-10-01" },
  { id: 2, title: "Mastering React Hooks", author: "B. Coder", content: "A deep dive into useState, useEffect, and custom hooks. Learn how to encapsulate logic and reuse it across your application.", date: "2024-09-25" },
  { id: 3, title: "The Power of Utility-First CSS", author: "C. Designer", content: "How Tailwind CSS dramatically speeds up styling and ensures design consistency without the headache of managing large CSS files.", date: "2024-09-15" },
];

const PostCard = ({ post }) => {
  const [likes, setLikes] = React.useState(0);
  const [showComments, setShowComments] = React.useState(false);

  const comments = ["Insightful read!", "Loved the section on state management.", "Keep up the great work!", "Very good!"];

  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <div className="post-meta">
        <span>By <strong>{post.author}</strong></span>
        <span>{post.date}</span>
      </div>
      <p>{post.content}</p>
      <div className="post-actions">
        <button onClick={() => setLikes(likes + 1)}>❤️ {likes} Likes</button>
        <button onClick={() => setShowComments(!showComments)}>
          {showComments ? "Hide Comments" : `View ${comments.length} Comments`}
        </button>
      </div>
      {showComments && (
        <div className="comments">
          <h4>Comments ({comments.length})</h4>
          {comments.map((c, i) => <p key={i}>"{c}"</p>)}
        </div>
      )}
    </div>
  );
};

const PostsPage = ({ posts }) => (
  <div className="page">
    <h1>Blog Posts</h1>
    {posts.map(post => <PostCard key={post.id} post={post} />)}
  </div>
);

const HomePage = () => (
  <div className="page center">
    <h1>Welcome to the React Blog</h1>
    <p>This app shows components, local state, and routing in React.</p>
    <Link to="/posts" className="btn">View All Posts</Link>
  </div>
);

const ContactPage = () => (
  <div className="page">
    <ContactForm />
  </div>
);

const NotFoundPage = () => (
  <div className="page center">
    <h1>404</h1>
    <p>Oops! Page not found.</p>
    <Link to="/" className="btn">Go Home</Link>
  </div>
);

const AppContent = () => (
  <div>
    <header className="header">
      <div className="logo">
        <img src="https://img.icons8.com/color/48/react-native.png" alt="logo" />
        <Link to="/">React Blog</Link>
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/admin">(Test 404)</Link>
      </nav>
    </header>
    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostsPage posts={initialPosts} />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  </div>
);

const App = () => (
  <HashRouter>
    <AppContent />
  </HashRouter>
);

export default App;