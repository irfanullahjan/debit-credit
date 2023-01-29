import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { DelayMiddleware } from './common/middlewares/delay.middleware';
import { TypeOrmExceptionFilter } from './common/typeorm-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.use(new DelayMiddleware().use);
  app.use(cookieParser());
  app.useGlobalFilters(new TypeOrmExceptionFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      // exceptionFactory: (errors) => new BadRequestException(errors),
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  // Not needed anymore, because we use the proxy through client/next.config.js
  // app.enableCors({
  //   origin: 'http://localhost:3000',
  // });

  await app.listen(3001);
}
bootstrap();
