import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar, Footer } from "../layouts";
import ScrollToTop from "./ScrollToTop";

const Home = lazy(() => import("../pages/Home/Home"));
const SobreMi = lazy(() => import("../pages/SobreMi/SobreMi"));
const Skills = lazy(() => import("../pages/Skills/Skills"));
const Project = lazy(() => import("../pages/Project/Project"));
const Curriculum = lazy(() => import("../pages/Curriculum/Curriculum"));
const Blog = lazy(() => import("../pages/Blog/Blog"));
const Contacto = lazy(() => import("../pages/Contacto/Contacto"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const BlogEntry = lazy(() => import("../components/BlogEntry/BlogEntry"))

export const AppRouter = () => {
  return (
    <Router>
      <ScrollToTop/>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobremi" element={<SobreMi />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/project" element={<Project />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogEntry />} /> {/* Ruta dinámica */}
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <Footer />
    </Router>
  );
};
