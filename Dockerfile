# syntax=docker/dockerfile:1
FROM node:20-alpine
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Expose Vite dev port
EXPOSE 3000

# Run Vite dev server listening on 0.0.0.0
CMD ["npm", "run", "dev"]


