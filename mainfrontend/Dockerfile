FROM <account_id>.dkr.ecr.<account_region>.amazonaws.com/nodejsbase:arm64-latest
WORKDIR /app
# Install AWS CLI (Debian package)
RUN apt-get update && apt-get install -y awscli
COPY create-env.sh /app/create-env.sh
RUN chmod +x /app/create-env.sh
# Copy package files
COPY package.json  ./
COPY .env .env.development ./

RUN npm cache clean --force
RUN  npm install
# Install production dependencies only



# Copy app files
COPY . .
RUN rm -f .env .env.* || true
COPY create-env.sh /app/create-env.sh
RUN chmod +x /app/create-env.sh
RUN /app/create-env.sh

RUN npm run build

# Install PM2 globally
RUN npm install -g pm2

# Expose port
EXPOSE 3000
# Start app with PM2 runtime and your ecosystem file
CMD ["pm2-runtime", "npm", "--", "start"]
