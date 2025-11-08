#!/bin/sh

# Set environment variables
export DATABASE_URL=${DATABASE_URL:-}
export NODE_ENV="production"

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