<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descripcion

Este proyecto fue desarrollado con el framework [Nest](https://github.com/nestjs/nest).

## Instalacion

primero que nada deberemos instalar las dependencias de la aplicacion con el comando.
```bash
$ npm install
```
luego de eso deberemos crear un archivo .env con el siguiente formato 
```
    PORT=3000  <- puerto de la aplicacion
    NODE_ENV=local <- entorno de la aplicacion ( el entorno local sincronizara las entidades de typeorm en tablas de la base de datos PG) 
    DB_NAME=peliculasPrueba <- nombre de la base de datos de prueba
    DB_PASSWORD=passwordPrueba <- contraseña de la base de datos de prueba
    DB_HOST=localhost <- host de la base de datos de prueba
    DB_USER=postgres <- usuario de la base de datos de prueba
    DB_SSL=false <- booleano de si la base de datos tiene SSL de la base de datos de prueba
    MOVIE_API_KEY=key-asd-asd-asd <- API_KEY de themoviedb.org v3 (pasare la mia por el correo ya que el repositorioo es publico).
    MOVIE_API_URL=https://api.themoviedb.org/3/ <- Endpoint de la API de themoviedb
    JWT_SECRET=prueba-peliculas <- secret del bearer token
    JWT_ISSUER=alirioangel <- issuer del bearer token
```
## Iniciando la aplicacion

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

Nest is [MIT licensed](LICENSE).
