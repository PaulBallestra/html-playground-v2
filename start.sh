#!/bin/sh

# Set environment variables
export DATABASE_URL=${DATABASE_URL:-}
export NODE_ENV="production"
# export AUTH_URL=${AUTH_URL:-}
# export AUTH_SECRET=${AUTH_SECRET:-}
# export LIVEBLOCKS_SECRET_KEY=${LIVEBLOCKS_SECRET_KEY:-}
# export NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=${NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY:-}
# export AUTH_GOOGLE_ID=${AUTH_GOOGLE_ID:-}
# export AUTH_GOOGLE_SECRET=${AUTH_GOOGLE_SECRET:-}

# Debug: Log environment variables (without exposing sensitive data)
echo "Environment Debug:"
echo "NODE_ENV: $NODE_ENV"

# Initialize database
echo "Setting up database..."
echo "Database URL: $DATABASE_URL"
echo "Current user: $(whoami)"

# Create prisma directory and set permissions
echo "Creating prisma directory..."
mkdir -p /app/prisma

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Push schema to database
echo "Pushing database schema..."
npx prisma db push

echo "Database setup complete!"

# Switch to nextjs user and start the application
echo "Starting application..."
exec npm start