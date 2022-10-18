# Adonis API application


Copie o arquivo .env.example para .env:

cp .env.example .env:

## Setup

Suba o ambiente backend com o docker-compose:

dorcker-compose up

*Vai ser nessesario criar o banco de dados "erural"


### Migrations


```js
dorcker-compose run --rm adonis adonis migration:run
```
