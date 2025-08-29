// src/components/ColorConverter.jsx
import React, { useState, useEffect } from 'react';

/**
 * Converts HEX color to RGB format
 * @param {string} hex - HEX color string (e.g., "#FF0000" or "#F00")
 * @returns {object|null} - RGB object with r, g, b values or null if invalid
 */
const hexToRgb = (hex) => {
  // Remove # if present and validate format
  const cleanHex = hex.replace('#', '');
  
  // Validate HEX format (3 or 6 characters)
  if (!/^([0-9A-F]{3}){1,2}$/i.test(cleanHex)) {
    return null;
  }
  
  let color = cleanHex.split('');
  
  // Convert 3-digit HEX to 6-digit
  if (color.length === 3) {
    color = [color[0], color[0], color[1], color[1], color[2], color[2]];
  }
  
  const r = parseInt(color[0] + color[1], 16);
  const g = parseInt(color[2] + color[3], 16);
  const b = parseInt(color[4] + color[5], 16);
  
  return { r, g, b };
};

/**
 * Converts RGB color to HEX format
 * @param {string|object} rgb - RGB string (e.g., "rgb(255, 0, 0)") or object {r, g, b}
 * @returns {string|null} - HEX color string or null if invalid
 */
const rgbToHex = (rgb) => {
  let r, g, b;
  
  if (typeof rgb === 'string') {
    // Parse RGB string format
    const result = rgb.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (!result) return null;
    
    r = parseInt(result[1]);
    g = parseInt(result[2]);
    b = parseInt(result[3]);
  } else if (typeof rgb === 'object' && rgb.r !== undefined) {
    // Handle RGB object format
    r = rgb.r;
    g = rgb.g;
    b = rgb.b;
  } else {
    return null;
  }
  
  // Validate RGB values are within valid range (0-255)
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    return null;
  }
  
  // Convert to HEX with proper padding
  const toHex = (value) => {
    const hex = value.toString(16).toUpperCase();
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const ColorConverter = () => {
  const [hexInput, setHexInput] = useState('#FF5733');
  const [rgbInput, setRgbInput] = useState('rgb(255, 87, 51)');
  const [hexOutput, setHexOutput] = useState('#FF5733');
  const [rgbOutput, setRgbOutput] = useState('rgb(255, 87, 51)');
  const [hexError, setHexError] = useState('');
  const [rgbError, setRgbError] = useState('');
  const [colorPreview, setColorPreview] = useState('#FF5733');
  const [copySuccess, setCopySuccess] = useState('');

  // Real-time conversion from HEX to RGB
  useEffect(() => {
    if (hexInput.trim()) {
      const rgbResult = hexToRgb(hexInput);
      if (rgbResult) {
        const rgbString = `rgb(${rgbResult.r}, ${rgbResult.g}, ${rgbResult.b})`;
        setRgbOutput(rgbString);
        setColorPreview(hexInput);
        setHexError('');
      } else {
        setHexError('Invalid HEX format. Use #RRGGBB or #RGB');
        setRgbOutput('');
      }
    } else {
      setRgbOutput('');
      setHexError('');
    }
  }, [hexInput]);

  // Real-time conversion from RGB to HEX
  useEffect(() => {
    if (rgbInput.trim()) {
      const hexResult = rgbToHex(rgbInput);
      if (hexResult) {
        setHexOutput(hexResult);
        setColorPreview(hexResult);
        setRgbError('');
      } else {
        setRgbError('Invalid RGB format. Use rgb(r, g, b)');
        setHexOutput('');
      }
    } else {
      setHexOutput('');
      setRgbError('');
    }
  }, [rgbInput]);

  // Copy to clipboard functionality
  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(`${type} copied!`);
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Preset color palette
  const presetColors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33F5', '#F5FF33',
    '#FF8C33', '#33FFF5', '#8C33FF', '#FF3333', '#33FF33'
  ];

  const handlePresetClick = (color) => {
    setHexInput(color);
    const rgbResult = hexToRgb(color);
    if (rgbResult) {
      setRgbInput(`rgb(${rgbResult.r}, ${rgbResult.g}, ${rgbResult.b})`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Professional Color Converter
        </h1>
        <p className="text-gray-600 text-lg">
          Seamlessly convert between HEX and RGB color formats
        </p>
      </div>

      {/* Color Preview */}
      <div className="flex justify-center mb-8">
        <div 
          className="w-32 h-32 rounded-full shadow-lg border-4 border-white transition-all duration-300 hover:scale-110"
          style={{ backgroundColor: colorPreview }}
          title={`Current color: ${colorPreview}`}
        />
      </div>

      {/* Main Conversion Interface */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* HEX to RGB Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
            <span className="w-4 h-4 bg-blue-500 rounded-full mr-3"></span>
            HEX to RGB
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                HEX Input
              </label>
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                placeholder="#FF5733 or #F53"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
              {hexError && (
                <p className="text-red-500 text-sm mt-1 animate-pulse">{hexError}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                RGB Output
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={rgbOutput}
                  readOnly
                  className="w-full p-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-700"
                />
                {rgbOutput && (
                  <button
                    onClick={() => copyToClipboard(rgbOutput, 'RGB')}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors duration-200"
                  >
                    Copy
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RGB to HEX Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
            <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
            RGB to HEX
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                RGB Input
              </label>
              <input
                type="text"
                value={rgbInput}
                onChange={(e) => setRgbInput(e.target.value)}
                placeholder="rgb(255, 87, 51)"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
              />
              {rgbError && (
                <p className="text-red-500 text-sm mt-1 animate-pulse">{rgbError}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                HEX Output
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={hexOutput}
                  readOnly
                  className="w-full p-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-700"
                />
                {hexOutput && (
                  <button
                    onClick={() => copyToClipboard(hexOutput, 'HEX')}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors duration-200"
                  >
                    Copy
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Colors */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Quick Color Presets</h3>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {presetColors.map((color, index) => (
            <button
              key={index}
              onClick={() => handlePresetClick(color)}
              className="w-12 h-12 rounded-lg shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-200 border-2 border-gray-200 hover:border-gray-400"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Copy Success Message */}
      {copySuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          {copySuccess}
        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-8 text-gray-500 text-sm">
        <p>Professional Color Converter • Real-time Conversion • Copy to Clipboard</p>
      </div>
    </div>
  );
};

export default ColorConverter;
