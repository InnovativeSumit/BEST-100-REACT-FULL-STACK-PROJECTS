# Credit Card Validator with Interactive Animationss

## Project Overview

This project is a credit card validator application built using React. It features an interactive credit card component that visually updates as the user inputs details, providing a dynamic and engaging user experience. The application validates credit card numbers in real-time and offers a clean, modern UI/UX.

## Features

*   **Interactive Credit Card Display**: The credit card component dynamically updates with entered card number, cardholder name, expiry date, and CVV.
*   **Real-time Validation**: Validates credit card numbers instantly as you type.
*   **CVV Flip Animation**: The credit card visually flips to the back when the CVV input field is focused, enhancing realism.
*   **Responsive Design**: The application is designed to be visually appealing and functional across various devices.
*   **Clean UI/UX**: A user-friendly interface with clear input fields and feedback messages.

## Technologies Used

*   **React**: A JavaScript library for building user interfaces.
*   **Vite**: A fast build tool that provides a lightning-fast development experience.
*   **CSS**: For styling and animations.
*   **`validator` package**: A library for string validation and sanitization, specifically used here for credit card number validation.

## Setup and Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository (if applicable)**:

    ```bash
    git clone <repository_url>
    cd credit-card-project
    ```

    *(Note: Since this project was provided as a zip file, you would typically extract it and navigate into the directory.)*

2.  **Install Dependencies**:

    Navigate to the project directory in your terminal and install the necessary Node.js packages:

    ```bash
    npm install
    ```

## Running the Application

After installing the dependencies, you can start the development server:

```bash
npm run dev
```

This command will start the Vite development server, and you can access the application in your web browser, usually at `http://localhost:5173` (or another port if 5173 is in use).

## Project Structure

```
credit-card-project/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.css
│   ├── App.jsx
│   ├── CreditCard.css
│   ├── CreditCard.jsx
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

*   `public/`: Contains static assets like `index.html` (the main HTML file), `favicon.ico`, and `manifest.json`.
*   `src/`: Contains the core source code for the React application.
    *   `assets/`: Stores static assets like images.
    *   `App.css`: Global styles for the main application layout.
    *   `App.jsx`: The main application component, handling state and integrating the `CreditCard` component.
    *   `CreditCard.css`: Styles specific to the `CreditCard` component, including animations.
    *   `CreditCard.jsx`: The interactive credit card display component.
    *   `main.jsx`: The entry point of the React application, rendering the `App` component.
*   `package.json`: Defines project metadata and lists dependencies.
*   `vite.config.js`: Configuration file for Vite.

## How to Use

1.  **Enter Card Number**: Type your credit card number into the input field. The card number on the display will update in real-time. The application will also indicate if the number is valid or invalid.
2.  **Enter Card Holder Name**: As you type your name, it will appear on the credit card display.
3.  **Enter Expiry Date**: Input the month (MM) and year (YY) for the card's expiry date.
4.  **Enter CVV**: When you focus on the CVV input field, the credit card display will flip to show the back, allowing you to see the CVV field. It will flip back when you unfocus.

## Future Enhancements

*   **Card Type Detection**: Automatically detect and display the credit card type (Visa, Mastercard, etc.).
*   **Form Validation**: More comprehensive form validation for expiry date and CVV.
*   **Theming**: Allow users to switch between different card designs or themes.
*   **Accessibility Improvements**: Ensure the application is fully accessible to users with disabilities.

## Contributing

Contributions are welcome! Please feel free to fork the repository, create a new branch, and submit a pull request with your improvements.

### MIT License Summary
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty


<div align="center">
<p>Made with ❤️ by <strong>SUMIT PAL</strong></p>

🌟 Let's Connect

I'm passionate about collaborating on innovative projects and sharing knowledge about *coding, design, robotics, and AI*. Let's build something amazing together!  

[![Instagram](https://img.icons8.com/fluency/48/instagram-new.png)](https://www.instagram.com/sumittech_360)  [![YouTube](https://img.icons8.com/fluency/48/youtube-play.png)](https://youtube.com/channel/UCiPxbNaC7dloVut6Jc5xHIQ)  [![GitHub](https://img.icons8.com/fluency/48/github.png)](https://github.com/InnovativeSumit)  [![LinkedIn](https://img.icons8.com/fluency/48/linkedin.png)](https://www.linkedin.com/in/sumit-pal-40511a339) 

⭐ Star this repo on GitHub — it helps!

<p>For questions or support, please open an issue on the repository.</p>
</div>

