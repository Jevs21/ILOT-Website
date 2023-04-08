# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the project
RUN npm run build

# Expose the default port for Vite
EXPOSE 5173

# Start the application
CMD ["npm", "start"]
