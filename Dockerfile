FROM node:lts

WORKDIR /app

# Copy package.json & package-lock.json to the root of the api dir
COPY package*.json ./
COPY yarn.lock ./

# Create an .env file by copying the .env.example file
COPY .env.example .env

# Add node_modules to the envionmental path variable so we can run binaries easily
ENV PATH /app/node_modules/.bin:$PATH

RUN yarn global add @adonisjs/cli
RUN yarn

EXPOSE 3322

CMD bash -c 'yarn && adonis serve --dev'
