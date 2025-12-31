# Deployment Guide

## Option 1: Docker (Recommended)

This is the easiest way to host the full stack (Frontend + Backend + Database) on any VPS (DigitalOcean, AWS, Hetzner, etc.).

### Prerequisites
- A server with [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

### Steps

1. **Clone the repository** to your server.
2. **Update Configuration**:
   - Open `docker-compose.yml`.
   - Change `NEXT_PUBLIC_API_URL` to your server's IP or domain (e.g., `http://your-server-ip:3001`).
3. **Run the Deployment Script**:
   ```bash
   ./deploy.sh
   ```
   This will build the containers and start them in the background.

4. **Access the App**:
   - Frontend: `http://your-server-ip:3000`
   - Backend: `http://your-server-ip:3001`

### Data Persistence
The SQLite database is stored in the `./data` folder on your host machine. This ensures your data survives container restarts.

---

## Option 2: Cloud Platforms (Vercel + Railway)

If you prefer serverless:

1. **Frontend**: Deploy `neurofeedback-frontend` to **Vercel**.
   - Set Environment Variable: `NEXT_PUBLIC_API_URL` = Your Backend URL.
2. **Backend**: Deploy `neurofeedback-backend` to **Railway** or **Render**.
   - **Important**: You must use a service that supports **Persistent Volumes** (like Railway) because this app uses a local SQLite file. If you deploy to a standard serverless function, your database will be wiped on every restart.
   - Set Environment Variable: `DB_PATH` = `/app/data/neurofeedback.db` (and mount a volume there).

---

## Updating the Extension

When you deploy the backend to a remote server, you must update the Chrome Extension to point to the new URL.

1. Open `neurofeedback-extension/background.js`.
2. Change line 2:
   ```javascript
   const API_URL = 'http://your-server-ip:3001';
   ```
3. Reload the extension in `chrome://extensions`.
