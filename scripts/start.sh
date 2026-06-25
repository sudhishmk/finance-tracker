#!/bin/bash

set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "🚀 Starting Finance Tracker..."

# Start backend
gnome-terminal --title="Finance Tracker Backend" \
  -- bash -c "cd '$ROOT_DIR/app' && ./mvnw quarkus:dev; exec bash"

sleep 5

# Start frontend
gnome-terminal --title="Finance Tracker UI" \
  -- bash -c "cd '$ROOT_DIR/ui' && npm install && npm run dev; exec bash"

echo ""
echo "Backend : http://localhost:8080"
echo "Frontend: http://localhost:5173"
echo ""
echo "Happy coding! 🎉"
