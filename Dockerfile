# Stage 1: Install dependencies and development environment
FROM oven/bun:1 AS base

WORKDIR /app

# Copy package.json and package-lock.json first to cache dependencies
FROM base AS development
COPY package.json bun.lockb ./
RUN bun install
COPY . .

# Expose the port for Vite development server
# EXPOSE 5173

# Set NODE_ENV to development
ENV VITE_APP_NODE_ENV=development

# Run the development server
CMD ["bun", "run", "dev", "--host", "0.0.0.0"]