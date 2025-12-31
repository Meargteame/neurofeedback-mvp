#!/bin/bash

# Kill ports 3000 and 3001 if they are in use (optional, but good for clean start)
echo "Cleaning up ports..."
fuser -k 3000/tcp > /dev/null 2>&1
fuser -k 3001/tcp > /dev/null 2>&1

echo "Starting NeuroFeedback.OS MVP..."

# Start Backend
echo "Initializing Backend..."
cd neurofeedback-backend
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to initialize
sleep 2

# Start Frontend
echo "Initializing Frontend..."
cd ../neurofeedback-frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi
npm run dev &
FRONTEND_PID=$!

echo "------------------------------------------------"
echo "SYSTEM ONLINE"
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:3001"
echo "------------------------------------------------"
echo "Press CTRL+C to shut down both servers."

# Handle shutdown
trap "kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT

wait
