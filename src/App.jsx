import { useState } from "react";
import {  BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import "./App.css";
import Home from "./home";
import Portfolio from "./portfolio";
import About from "./about";
import Error404 from "./error404";
const navLinks = [
  {
    path: '/',
    page: 'Home',
  },
  {
    path: '/portfolio',
    page: 'Portfolio',
  },
  {
    path: '/about',
    page: 'About',
  },
];

export default function App() {
 
  const [activeLink, setActiveLink] = useState(window.location.pathname);

  return (
    <BrowserRouter>
      <div className="">
        <header className="header p-3  shadow-sm bg-dark-subtle d-flex justify-content-between">
          <span className="display-6">Logo</span>
          <nav className="navbar">
           
            {navLinks.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                onClick={() => setActiveLink(item.path)}
                className={activeLink === item.path ? 'nav-link act active' : 'nav-link'}
              >
                {item.page}
              </Link>
            ))}
          </nav>
        </header>

        <div>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/*" element={<Error404 />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    
  );
}