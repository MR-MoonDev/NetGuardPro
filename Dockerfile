# 1. Base image
FROM node:20-alpine

# 2. Working directory
WORKDIR /app

# 3. Yarn files copy karein
COPY package.json yarn.lock ./

# 4. Dependencies install karein
RUN yarn install

# 5. Baqi saara code copy karein
COPY . .

# 6. # Purani line: EXPOSE 5173
# Nayi line:
EXPOSE 3000

# 7. Dev mode mein chalane ki command
CMD ["yarn", "dev"]