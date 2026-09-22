FROM node:20-alpine

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install --omit=dev

# Copy application source
COPY . .

# The app writes/serves uploaded images from /uploads
# (config/upload.js and server.js both resolve to this absolute path)
RUN mkdir -p /uploads

EXPOSE 4000

CMD ["node", "server.js"]
