# 1. Base Image: Use a lightweight Node.js image
FROM node:20-alpine AS base

# 2. Set Working Directory
WORKDIR /app

# 3. Install dependencies
COPY package.json package-lock.json ./
# Use --omit=dev for production builds to skip devDependencies
RUN npm install #--omit=dev

# 4. Copy the rest of the application code
COPY . .

# 5. Build the Next.js application
RUN npm run build

# 6. Expose the port the app will run on
EXPOSE 3000

# 7. Set the user to a non-root user for security
USER node

# 8. Define the command to start the app
CMD ["npm", "run", "start"]