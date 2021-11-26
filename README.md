# open-masjid

Create an open source system for masjids to better serve their community by providing congregrational prayer times.

## Getting Started:

### 1. Allow access to api running on localhost: 
`npx localtunnel --subdomain open-masjid --port 3000`

### 2. Start database:
`docker-compose up -d`

### 3. Start api
`cd api && yarn && yarn dev`

### 4. Start app:
`cd app && yarn && expo start`