# Color Palette Generator

<h1 align="center">
  <img
      src="https://readme-typing-svg.demolab.com?font=Roboto+Slab&color=9f4bff&size=30&center=true&vCenter=true&width=450&lines=React+Color+Palette+Generator;"
      alt="React Color Palette Generator"
  />
</h1>
  <br/>

<div align="center">
  <img
    alt="GitHub repo size"
    src="https://img.shields.io/github/repo-size/purnasth/vite-react-tailwind-starter?color=9f4bff&logo=github&style=for-the-badge&logoColor=9f4bff"
  />
  <img
    alt="GitHub forks"
    src="https://img.shields.io/github/forks/purnasth/vite-react-tailwind-starter?color=9f4bff&logo=github&style=for-the-badge&logoColor=9f4bff"
  />
  <img
    alt="GitHub Repo stars"
    src="https://img.shields.io/github/stars/purnasth/vite-react-tailwind-starter?color=9f4bff&logo=github&style=for-the-badge&logoColor=9f4bff"
  />
  <img
    alt="Last commit"
    src="https://img.shields.io/github/last-commit/purnasth/vite-react-tailwind-starter?color=9f4bff&logo=git&logoColor&style=for-the-badge"
  />
  <img
    alt="Commit activity"
    src="https://img.shields.io/github/commit-activity/m/purnasth/vite-react-tailwind-starter?color=9f4bff&logo=git&logoColor&style=for-the-badge"
  />
</div>
<br />

<p align="center">This project is a modern and responsive color palette generator built with React, Vite, and TailwindCSS. It provides a seamless experience for generating, exploring, and managing color schemes for your design projects.</p>

---

## ✨ Features

-   **Generate Random Palettes**: Quickly create new color combinations with a single click.
-   **Copy Colors**: Easily copy color codes (e.g., HEX, RGB) to your clipboard.
-   **Responsive Design**: Optimized for various screen sizes, from desktop to mobile.
-   **Modern Stack**: Built with React for dynamic UIs, Vite for fast development, and TailwindCSS for utility-first styling.

---
## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### 1. Clone the repository

```sh
git clone https://github.com/purnasth/vite-react-tailwind-starter.git
cd vite-react-tailwind-starter # Navigate into the project directory
```

### 2. Install Dependencies and Run

Run the following commands in your terminal:

```sh
npm install
npm run dev
```

-   <b><em>`npm install`</em></b>: Installs all necessary Node.js modules and dependencies.
-   <b><em>`npm run dev`</em></b>: Starts the development server and opens the application in your browser (by default at `http://localhost:5173/`).

------
## 🛠️ Technologies Used

This project leverages the following key technologies:

-   **React**: A JavaScript library for building user interfaces.
-   **Vite**: A next-generation frontend tooling that provides an extremely fast development experience.
-   **TailwindCSS**: A utility-first CSS framework for rapidly building custom designs.
-   **React Icons**: For including popular icons in your React projects.
-   **Axios**: A promise-based HTTP client for the browser and node.js.

---

## 💡 Manual Setup (For Reference)

If you prefer to set up a Vite + React project with TailwindCSS manually, here are the steps:

### Install Vite + React

```sh
npm create vite@latest ./
# Select a framework: React
# Select a variant: JavaScript + SWC
npm install
npm run dev
```

### Install TailwindCSS

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configure `tailwind.config.js`

Replace the inner codes of `tailwind.config.js` with:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Add Tailwind Directives to `index.css`

Paste these lines into your `index.css` file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Install Additional Libraries

-   **React Icons**:
    ```sh
    npm install react-icons --save
    ```
-   **Axios**:
    ```sh
    npm install axios
    ```

---

## 🌟 Let's Connect

I'm passionate about collaborating on innovative projects and sharing knowledge about *coding, design, robotics, and AI*. Let's build something amazing together!  

 [![Instagram](https://img.icons8.com/fluency/48/instagram-new.png)](https://www.instagram.com/sumittech_360)  [![YouTube](https://img.icons8.com/fluency/48/youtube-play.png)](https://youtube.com/channel/UCiPxbNaC7dloVut6Jc5xHIQ)  [![GitHub](https://img.icons8.com/fluency/48/github.png)](https://github.com/InnovativeSumit)  [![LinkedIn](https://img.icons8.com/fluency/48/linkedin.png)](https://www.linkedin.com/in/sumit-pal-40511a339) 



⭐ Star this repo on GitHub — it helps!



---

## 🤝 Contributions and Feedback

We welcome contributions and feedback to improve this project! The current version of this README.md file has been updated based on valuable modifications suggested by the user in the issues section. Your input helps us make this tool even better.

If you have any suggestions, feature requests, or bug reports, please feel free to open an issue or submit a pull request.

