FROM node:8

ARG CORE_URL
ENV CORE_URL ${CORE_URL}
ENV NODE_ENV production

COPY . .
RUN npm install && npm run build

EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]
