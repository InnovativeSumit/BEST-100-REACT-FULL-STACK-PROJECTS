import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Storys from "./Storys";
import { WiStars } from "react-icons/wi";
import { FiFeather } from "react-icons/fi";
import Button from "../layouts/Button";

const AiStory = () => {
  const [prompts, setPrompts] = useState("");
  const [story, setStory] = useState(false);
  const [error, setError] = useState("");

  const handleStory = () => {
    if (prompts.trim() === "") {
      setError("Prompt cannot be empty. Please enter a prompt.");
      return;
    }
    if (prompts.trim().split(' ').length < 3) {
      setError("Please enter at least 3 keywords for better story generation.");
      return;
    }
    console.log("clicked");
    setStory(true);
    setError(""); // Clear any previous errors
  };

  const handleInputChange = (e) => {
    setPrompts(e.target.value);
    if (error) setError(""); // Clear error when user starts typing
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className="min-h-[70vh] max-h-[80vh] lg:min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <FiFeather className="text-purple-600 mr-3" size={40} />
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Story Generator
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Transform your ideas into captivating stories across multiple genres. Enter keywords and watch as AI crafts unique tales just for you.
            </p>
          </div>

          <div className="p-8 mt-6 backdrop-blur-md bg-white/20 shadow-2xl border border-white/30 flex flex-col items-center rounded-2xl lg:my-10 max-w-lg w-full">
            <div className="flex items-center w-full mb-6">
              <h2 className="flex items-center font-semibold text-xl px-3 bg-gradient-to-br from-purple-600 to-blue-500 text-transparent bg-clip-text">
                <WiStars size={28} className="text-purple-500 font-semibold mr-2" />
                Enter Your Keywords
              </h2>
            </div>
            
            <textarea
              className="w-full h-32 p-4 bg-white/80 rounded-xl border-2 border-purple-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-200 resize-none text-gray-700 placeholder-gray-500"
              placeholder="Enter 4-6 keywords that inspire your story (e.g., dragon, castle, magic, princess, adventure, mystery)"
              value={prompts}
              onChange={handleInputChange}
            ></textarea>
            
            <div className="text-sm text-gray-600 mt-2 mb-4 text-center">
              <span className="font-medium">Tip:</span> Use descriptive keywords for more engaging stories
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm my-3 w-full text-center">
                {error}
              </div>
            )}
            
            <div className="mt-4">
              <Button title="Generate Stories" onClick={handleStory} />
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ✨ Generates 5 unique stories in different genres
              </p>
            </div>
          </div>
        </div>
      </div>
      {story && <Storys prompts={prompts} />}
      <hr className="border-1.5 border-gray-300" />
      <Footer />
    </div>
  );
};

export default AiStory;
