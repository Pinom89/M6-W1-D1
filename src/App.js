import React from "react";
import NavBar from "./components/navbar/BlogNavbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./views/home/Home.jsx";
import Blog from "./views/blog/Blog.jsx";
import Autori from "./components/Autori.jsx";
import NewBlogPost from "./views/new/New.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
        <Route path="*" element={<Autori />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
