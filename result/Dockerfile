FROM node:18-alpine
WORKDIR /app

# Install necessary system dependencies
RUN apk add --no-cache tini

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application files
COPY . .

# Add non-root user
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nodejs

# Set permissions
RUN chown -R nodejs:nodejs /app

# Use tini as subreaper in Docker container to adopt zombie processes
ENTRYPOINT ["/sbin/tini", "--"]

# Run the application
USER nodejs
EXPOSE 80
CMD ["npm", "start"]