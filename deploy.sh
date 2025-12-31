#!/bin/bash

echo "Deploying NeuroFeedback.OS..."

# Create data directory if it doesn't exist
mkdir -p data

# Build and start containers
docker-compose up -d --build

echo "------------------------------------------------"
echo "DEPLOYMENT COMPLETE"
echo "Frontend running on port 3000"
echo "Backend running on port 3001"
echo "------------------------------------------------"
