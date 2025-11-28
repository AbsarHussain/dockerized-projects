# Use Node.js LTS image
FROM <account_id>.dkr.ecr.<account_region>.amazonaws.com/node:20.9.0-amd64

# Set working directory
WORKDIR /usr/src/app

# Copy dependency definitions first (for caching)
COPY package*.json ./
COPY ecosystem.config.js ./

# Install dependencies
RUN npm install

# Install PM2 globally
RUN npm install -g pm2

# Copy the rest of the app
COPY . .

# Expose app port
EXPOSE 3000

# Start app with pm2-runtime (keeps PID 1 inside container)
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
