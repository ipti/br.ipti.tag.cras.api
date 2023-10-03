import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import * as session from 'express-session';
import Sequelize from '@sequelize/core';
import DbConnection from './sequelize/sequelize';
import { initModels } from './sequelize/models/init-models';

declare const module: any;

async function bootstrap() {

  const connection: Sequelize = DbConnection.getInstance().getConnection();

  initModels(connection);

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: async (
      requestOrigin: string,
      next: (err: Error | null, origin?: string[]) => void,
    ) => {
      const origins = await app.get(AppService).getOrigins();
      next(null, origins);
    },
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Tecnologia de Apoio à Gestão: TAG API 3.0')
    .setDescription(
      'API do sistema de gestão escolar TAG(Tecnologia de Apoio à Gestão) desenvolvido pelo IPTI.',
    )
    .setVersion(process.env.npm_package_version)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.APP_PORT || 3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();