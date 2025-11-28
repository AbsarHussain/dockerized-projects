# Base image with Node.js
FROM <account_id>.dkr.ecr.<account_region>.amazonaws.com/node:16-alpine-arm64
# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Build React app
RUN npm run build

# Install PM2 globally
RUN npm install -g pm2

# Expose port
EXPOSE 3000

# Start app using PM2
CMD ["pm2-runtime", "ecosystem.config.js"]
