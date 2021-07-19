import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global Middlewares
  app.use(helmet());
  app.use(compression());
  app.use(
    rateLimit({
      windowMs: 3000,
      max: 100,
    }),
  );
  app.use(bodyParser.json({ limit: '1000mb' }));
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('Super API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('*explorer', app, document);

  const configService: ConfigService = app.get(ConfigService);

  await app.listen(configService.get('port'));
  Logger.log(`The app is running in port ${configService.get('port')}`);
}
bootstrap();
