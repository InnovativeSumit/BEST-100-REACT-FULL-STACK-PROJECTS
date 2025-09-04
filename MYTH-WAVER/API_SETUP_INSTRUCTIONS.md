# Myth Weaver - API Setup Instructions

## Getting a Valid Gemini API Key

The API key you provided (`AIzaSyBZ_wndDEjBBada6ykYrJ2dj7ssrHrHvx8plz`) is not valid. To get the AI story generation working, you need to obtain a valid Google Gemini API key.

### Steps to Get a Valid API Key:

1. **Visit Google AI Studio**: Go to [https://aistudio.google.com/](https://aistudio.google.com/)

2. **Sign in**: Use your Google account to sign in

3. **Get API Key**: 
   - Click on "Get API key" in the left sidebar
   - Click "Create API key"
   - Select an existing Google Cloud project or create a new one
   - Copy the generated API key

4. **Update the Environment File**:
   - Open the `.env` file in your project root
   - Replace the current API key with your new valid key:
   ```
   VITE_API_KEY=your_actual_api_key_here
   ```

5. **Restart the Development Server**:
   - Stop the current server (Ctrl+C)
   - Run `npm run dev` again

### Important Notes:

- Keep your API key secure and never share it publicly
- The API key should start with `AIza` followed by more characters
- Make sure you have enabled the Generative Language API in your Google Cloud Console
- There might be usage limits depending on your Google Cloud billing setup

### Testing the API Key:

Once you've updated the API key, test it by:
1. Going to the AI Story Generator page
2. Entering some keywords (e.g., "dragon castle magic princess adventure mystery")
3. Clicking "Generate Stories"
4. You should see 5 different stories in various genres

If you continue to see errors, check the browser console (F12) for specific error messages.

