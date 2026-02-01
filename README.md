# Miracle Trading App

A modern, AI-powered trading portfolio dashboard built with React and Vite. This application provides real-time market insights and deep portfolio analysis using Google's Gemini AI.

![Trading Dashboard](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?logo=google-gemini&logoColor=white)

## Features

- **Real-time Visualization**: Dynamic stock charts using Recharts.
- **AI Market Insights**: Instant analysis of stock movements powered by Gemini AI.
- **Deep Portfolio Analysis**: Professional-grade risk assessment and sector exposure reports.
- **Interactive AI Assistant**: Ask questions specifically about your holdings and cash balance.
- **Modern UI**: Clean, glassmorphic design with responsive layouts.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/)
- A **Google Gemini API Key**. You can get one for free at [Google AI Studio](https://aistudio.google.com/).

## Getting Started

Follow these steps to get the project up and running on your local machine:

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd miracle-trading-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
The app requires a Gemini API key to function.
1. Create a file named `.env.local` in the root directory.
2. Add your API key to the file:
   ```env
   API_KEY=your_gemini_api_key_here
   ```

### 4. Run the development server
```bash
npm run dev
```
Once started, open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) in your browser.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Vanilla CSS
- **AI**: @google/genai (Gemini 1.5 Flash & Pro)
- **Charts**: Recharts
- **Icons**: Lucide React

## Security Note

Never commit your `.env.local` file to GitHub. This file is already included in `.gitignore` to prevent your private API keys from being exposed.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
