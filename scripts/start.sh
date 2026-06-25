#!/bin/bash

echo "Starting Backend..."
gnome-terminal -- bash -c "cd app && ./mvnw quarkus:dev; exec bash"

echo "Starting UI..."
gnome-terminal -- bash -c "cd ui && npm run dev; exec bash"
