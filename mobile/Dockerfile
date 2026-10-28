# Mobile web preview only — native iOS/Android still run with Expo Go / EAS.
# This builds the Expo web export and serves it with Nginx.
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
ARG EXPO_PUBLIC_API_URL=http://localhost:8000/api
ENV EXPO_PUBLIC_API_URL=$EXPO_PUBLIC_API_URL
RUN npx expo export --platform web || npx expo export
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
