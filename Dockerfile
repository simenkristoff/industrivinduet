# Use small Alpine Linux image
FROM node:12-alpine

# Set environment variables
ENV PORT=8080
ARG CLIENT_ID

COPY . app/

WORKDIR app/

# Make sure dependencies exist for Webpack loaders
RUN apk add --no-cache \
    autoconf \
    automake \
    bash \
    g++ \
    libc6-compat \
    libjpeg-turbo-dev \
    libpng-dev \
    make \
    nasm 
RUN npm ci --only-production --silent

# Build production client side React application
RUN npm run build

# Install pm2
RUN npm install -g pm2
# Actual script to start can be overridden from `docker run`
CMD ["pm2", "start", "process.yml", "--no-daemon"]

# Expose port for Node
EXPOSE $PORT

# Start Node server
ENTRYPOINT npm run prod
