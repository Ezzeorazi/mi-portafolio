import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Blog, Contacto, Curriculum, Home, Proyectos, Skills, SobreMi, NotFound } from "../pages";

import { Navbar, Footer } from "../layouts";

export const AppRouter = () => {
  return (
    <Router>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobremi" element={<SobreMi />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </Router>
  );
};