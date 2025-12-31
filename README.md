# NeuroFeedback.OS - MVP

This is the Minimum Viable Product for NeuroFeedback.OS, a cognitive performance system that tracks focus and prevents burnout using non-invasive telemetry.

## Project Structure

- **neurofeedback-frontend/**: Next.js 14 application (Dashboard, Landing Page).
- **neurofeedback-backend/**: Express.js + SQLite server (Data persistence, Analytics).
- **neurofeedback-extension/**: Chrome Extension (Telemetry sensor).

## Prerequisites

- Node.js (v18+)
- Google Chrome (for the extension)

## Quick Start

### 1. Start the System (Frontend + Backend)

You can start both servers using the helper script:

```bash
./start-mvp.sh
```

Or run them manually in separate terminals:

**Backend (Port 3001):**
```bash
cd neurofeedback-backend
npm install
npm run dev
```

**Frontend (Port 3000):**
```bash
cd neurofeedback-frontend
npm install
npm run dev
```

### 2. Install the Chrome Extension

1. Open Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode** (toggle in the top right).
3. Click **Load unpacked**.
4. Select the `neurofeedback-extension` folder from this project.
5. The extension is now active and will sync data to `localhost:3001`.

## Deployment

### Option 1: Vercel (Frontend Only)
The frontend is configured to deploy on Vercel. 
1. Import this repository into Vercel.
2. **Important:** In Vercel Project Settings > General, set the **Root Directory** to `neurofeedback-frontend`.
3. The frontend will use mock data if the backend is not reachable.

### Option 2: Docker (Full Stack)
To deploy the full system (Frontend + Backend + Database) to a VPS or Docker-compatible host:

1. Ensure Docker and Docker Compose are installed.
2. Run the deployment script:
   ```bash
   ./deploy.sh
   ```
   Or manually:
   ```bash
   docker-compose up --build -d
   ```

1. Go to [http://localhost:3000/login](http://localhost:3000/login).
2. Sign up for a new account.
3. Go to **Settings** in the dashboard.
4. Copy your **Extension ID**.
5. Click the NeuroFeedback extension icon in your Chrome toolbar.
6. Paste the ID and click **Save**.

## Features

- **Real-time Focus Tracking**: Keystrokes and mouse activity are visualized.
- **Deep Work Timer**: Focus mode with visual cues.
- **Daily Journal**: Track subjective energy and mood.
- **Smart Break Suggestions**: AI-driven recovery protocols.
