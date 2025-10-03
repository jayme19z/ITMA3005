import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

// --- Static Data ---
const initialPosts = [
  { id: 1, title: "The Future of Single-Page Apps", author: "A. Developer", content: "Exploring how modern frameworks and clever state management make complex single-page applications fast, scalable, and a joy to maintain.", date: "2024-10-01" },
  { id: 2, title: "Mastering React Hooks", author: "B. Coder", content: "A deep dive into useState, useEffect, and custom hooks. Learn how to encapsulate logic and reuse it across your application.", date: "2024-09-25" },
  { id: 3, title: "The Power of Utility-First CSS", author: "C. Designer", content: "How Tailwind CSS dramatically speeds up styling and ensures design consistency without the headache of managing large CSS files.", date: "2024-09-15" },
];

// --- Sub-Components ---

/**
 * Renders an individual blog post card with local state management for interactions.
 * @param {object} props - Component props.
 * @param {object} props.post - The post data object.
 */
const PostCard = ({ post }) => {
  // Local State Management:
  const [likes, setLikes] = React.useState(Math.floor(Math.random() * 50) + 10);
  const [showComments, setShowComments] = React.useState(false);

  // Simulated comments
  const comments = ["Insightful read!", "Loved the section on state management.", "Keep up the great work!"];

  const handleLike = () => {
    setLikes(prevLikes => prevLikes + 1);
  };

  const toggleComments = () => {
    setShowComments(prevShow => !prevShow);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 font-sans">

      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{post.title}</h2>
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4 border-b pb-2">
        <span>By <span className="font-semibold text-indigo-600">{post.author}</span></span>
        <span>{post.date}</span>
      </div>

      <p className="text-gray-700 leading-relaxed mb-6">{post.content}</p>

      {/* Interactive Footer (Local State UI) */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">

        {/* Like Button */}
        <button
          onClick={handleLike}
          className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition duration-150 bg-red-100 text-red-600 hover:bg-red-200"
        >
          {/* Heart SVG Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
        </button>

        {/* Comment Toggle Button */}
        <button
          onClick={toggleComments}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition duration-150 ${showComments ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          {/* Chat SVG Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>{showComments ? 'Hide Comments' : `View ${comments.length} Comments`}</span>
        </button>
      </div>

      {/* Comments Section (Conditional Rendering based on Local State) */}
      {showComments && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-lg font-bold text-gray-800 mb-3">Comments ({comments.length})</h4>
          {comments.map((comment, index) => (
            <p key={index} className="text-gray-600 border-b border-gray-200 py-1 last:border-b-0 italic text-sm">
              &ldquo;{comment}&rdquo;
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * The page component for displaying all blog posts.
 */
const PostsPage = ({ posts }) => (
  <div className="max-w-4xl mx-auto py-8">
    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b-4 border-indigo-500 pb-2">Latest Blog Posts</h1>
    <div className="space-y-8">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  </div>
);

/**
 * The Home/Welcome page component.
 */
const HomePage = () => (
  <div className="max-w-4xl mx-auto py-24 text-center">
    <h1 className="text-6xl font-extrabold text-gray-900 mb-6">Welcome to the React Blog</h1>
    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
      This application demonstrates component-based architecture, local state management, and simple routing using React Router.
    </p>
    <Link
      to="/posts"
      className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
    >
      View All Posts
    </Link>
  </div>
);

/**
 * The Contact page component.
 */
const ContactPage = () => (
  <div className="max-w-4xl mx-auto py-16">
    <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-4 border-indigo-500 pb-2">Get in Touch</h1>
    <div className="bg-white p-8 rounded-xl shadow-lg space-y-4">
      <p className="text-lg text-gray-700">
        For inquiries, feedback, or collaborations, feel free to reach out.
      </p>
      <ul className="space-y-2">
        <li className="flex items-center text-gray-800">
          <span className="font-semibold w-24">Email:</span> blog@reactapp.com
        </li>
        <li className="flex items-center text-gray-800">
          <span className="font-semibold w-24">Phone:</span> (555) 123-4567
        </li>
        <li className="flex items-center text-gray-800">
          <span className="font-semibold w-24">Address:</span> 123 Component St, State City
        </li>
      </ul>
    </div>
  </div>
);

/**
 * Custom 404 Not Found Page component.
 */
const NotFoundPage = () => (
  <div className="py-24">
    <h1 className="text-9xl font-extrabold text-black mb-4">404</h1>
    <h2 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
    <p className="text-xl text-gray-600 mb-8">
      Oops! The page you are looking for does not exist or has been moved.
    </p>
    <Link
      to="/" // Navigate back to the home route
      className="inline-block bg-gray-100 text-black px-4 py-2 rounded-lg text-md font-semibold transition duration-300 hover:bg-gray-200"
    >
      Go to Home
    </Link>
  </div>
);

// --- Main Application Component (Router Implementation) ---

/**
 * Main application component that houses the router and layout.
 */
const AppContent = () => {
  // Navigation Bar Component now uses React Router's Link
  const NavLink = ({ to, label }) => (
    <Link
      to={to}
      className={`px-4 py-1 rounded-lg font-medium transition duration-200 
        text-gray-800 hover:text-black hover:bg-gray-100
        
        {/* Note: Active link styling in R-R-D requires useMatch/useResolvedPath hook,
            which we omit here for simplicity, focusing on core functionality. 
            The hover state provides visual feedback. */}
      `}
    >
      {label}
    </Link>
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Load Tailwind CSS */}
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
          body * {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>

      {/* Navigation Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-black tracking-wider">
            <Link to="/">Assignment 2</Link>
          </div>
          <nav className="flex space-x-3 items-center">
            <NavLink to="/" label="Home" />
            <NavLink to="/posts" label="Posts" />
            <NavLink to="/contact" label="Contact" />
            {/* Direct Link to a non-existent route for testing 404 */}
            <Link to="/admin" className="ml-2 px-3 py-1 rounded-full text-sm font-medium border border-black hover:bg-gray-100 transition duration-200">
              (Test 404)
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Area (Routes) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostsPage posts={initialPosts} />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Custom 404 Page: Catches all unmatched paths */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

    </div>
  );
};

// Wrapper component now uses HashRouter to avoid path manipulation errors in restricted environments.
const App = () => (
  <HashRouter>
    <AppContent />
  </HashRouter>
);

export default App;