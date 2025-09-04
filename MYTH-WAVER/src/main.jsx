import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AiStory from "./components/AiStory.jsx";
import About from "./components/About.jsx";
import Devs from "./components/Devs.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

const Home = () => {
  return (
    <App />
  )
}

const AI = () => {
  return (
    <AiStory />
  )
}

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <About />
      </div>
      <Footer />
    </div>
  )
}

const DevsPage = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <Devs />
      </div>
      <Footer />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/ai-story-generator" element={ <AI /> } />
        <Route path="/about" element={ <AboutPage /> } />
        <Route path="/devs" element={ <DevsPage /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
