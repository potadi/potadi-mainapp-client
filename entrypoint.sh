#!/bin/sh

# Check if in development or production mode
if [ "$NODE_ENV" = "development" ]; then
  echo "Running in development mode"
  npm run dev
else
  echo "Running in production mode"
  npm run build && npm run preview
fi
