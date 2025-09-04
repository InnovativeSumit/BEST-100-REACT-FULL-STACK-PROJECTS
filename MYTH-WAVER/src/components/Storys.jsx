import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoCopy } from "react-icons/io5";
import { Rings } from "react-loader-spinner";

const Storys = ({ prompts }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  const generateStory = async () => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      if (!apiKey) {
        throw new Error(
          "API key is missing. Please set VITE_API_KEY in your environment variables."
        );
      }

      const storyPrompts = [
        `Create a fantasy adventure story using these keywords: ${prompts}. Make it engaging and mystical in exactly 80 words.`,
        `Write a sci-fi thriller incorporating: ${prompts}. Focus on technology and suspense in exactly 80 words.`,
        `Craft a romantic tale featuring: ${prompts}. Include emotional depth and beautiful imagery in exactly 80 words.`,
        `Develop a mystery story with: ${prompts}. Build tension and intrigue in exactly 80 words.`,
        `Create an epic mythology story using: ${prompts}. Include gods, heroes, and ancient wisdom in exactly 80 words.`
      ];

      const storyTitles = [
        "Fantasy Adventure",
        "Sci-Fi Thriller", 
        "Romantic Tale",
        "Mystery Story",
        "Epic Mythology"
      ];

      const stories = [];
      
      for (let i = 0; i < 5; i++) {
        try {
          const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
            {
              contents: [
                {
                  parts: [
                    {
                      text: storyPrompts[i],
                    },
                  ],
                },
              ],
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (
            response.data &&
            response.data.candidates &&
            response.data.candidates[0] &&
            response.data.candidates[0].content &&
            response.data.candidates[0].content.parts
          ) {
            const candidate = response.data.candidates[0];
            stories.push({
              id: i + 1,
              title: storyTitles[i],
              description: candidate.content.parts[0].text.trim(),
              side: i % 2 === 0 ? "left" : "right",
            });
          } else {
            console.log(`No story generated for attempt ${i + 1}.`);
            stories.push({
              id: i + 1,
              title: storyTitles[i],
              description: "Unable to generate story at this time. Please try again.",
              side: i % 2 === 0 ? "left" : "right",
            });
          }
        } catch (storyError) {
          console.error(`Error generating story ${i + 1}:`, storyError);
          stories.push({
            id: i + 1,
            title: storyTitles[i],
            description: "Error generating story. Please check your connection and try again.",
            side: i % 2 === 0 ? "left" : "right",
          });
        }
        
        // Add a small delay between requests to avoid rate limiting
        if (i < 4) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      setEntries(stories);
    } catch (error) {
      console.error("Error generating stories:", error);
      setEntries([{
        id: 1,
        title: "Error",
        description: "Failed to generate stories. Please check your API key and internet connection.",
        side: "left"
      }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (prompts) {
      generateStory();
    }
  }, [prompts]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center lg:px-32 px-5 bg-gradient-to-br from-purple-50 to-blue-50">
      <h1 className="font-semibold text-center text-4xl lg:mt-14 mt-24 mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Generated Stories
      </h1>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="min-h-screen flex justify-center">
          <div className="w-full max-w-6xl mx-auto">
            {loading ? (
              <div className="flex flex-col justify-center items-center min-h-screen">
                <Rings
                  height="100"
                  width="100"
                  color="#8d5cf6"
                  radius="6"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="rings-loading"
                />
                <p className="mt-4 text-purple-600 font-medium">Crafting your stories...</p>
              </div>
            ) : (
              entries.map((entry, index) => (
                <div className="flex flex-row w-full mb-8" key={entry.id}>
                  {entry.side === "left" ? (
                    <>
                      <div className="lg:w-2/5 px-4 py-6 mx-2">
                        <div className="flex flex-col w-full rounded-xl shadow-lg bg-white px-6 py-6 hover:shadow-xl transition-shadow duration-300 border border-purple-100">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-semibold text-purple-700">{entry.title}</h3>
                            <IoCopy
                              className="text-gray-500 hover:text-purple-600 cursor-pointer transition-colors duration-200"
                              size={20}
                              onClick={() => copyToClipboard(entry.description)}
                              title="Copy to clipboard"
                            />
                          </div>
                          <div className="text-gray-700 leading-relaxed">
                            {entry.description}
                          </div>
                        </div>
                      </div>
                      <div className="w-1/5 flex justify-center">
                        <div className="relative flex h-full w-1 lg:w-2 bg-gradient-to-b from-purple-400 to-blue-400 items-center justify-center">
                          <div className="absolute flex flex-col justify-center h-16 w-16 lg:h-20 lg:w-20 rounded-full border-3 border-purple-400 leading-none text-center z-10 bg-white font-semibold text-purple-600 shadow-lg">
                            <div>{index + 1}</div>
                          </div>
                        </div>
                      </div>
                      <div className="w-2/5 px-4 py-6"></div>
                    </>
                  ) : (
                    <>
                      <div className="lg:w-2/5 px-4 py-6 mx-2"></div>
                      <div className="w-1/5 flex justify-center">
                        <div className="relative flex h-full w-1 lg:w-2 bg-gradient-to-b from-purple-400 to-blue-400 items-center justify-center">
                          <div className="absolute flex flex-col justify-center h-16 w-16 lg:h-20 lg:w-20 rounded-full border-3 border-purple-400 leading-none text-center z-10 bg-white font-semibold text-purple-600 shadow-lg">
                            <div>{index + 1}</div>
                          </div>
                        </div>
                      </div>
                      <div className="lg:w-2/5 px-4 py-6">
                        <div className="flex flex-col w-full rounded-xl shadow-lg bg-white px-6 py-6 hover:shadow-xl transition-shadow duration-300 border border-purple-100">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-semibold text-purple-700">{entry.title}</h3>
                            <IoCopy
                              className="text-gray-500 hover:text-purple-600 cursor-pointer transition-colors duration-200"
                              size={20}
                              onClick={() => copyToClipboard(entry.description)}
                              title="Copy to clipboard"
                            />
                          </div>
                          <div className="text-gray-700 leading-relaxed">
                            {entry.description}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storys;
