import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';
import morgan from 'morgan';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors) {
        const errorMsgs = errors.map((err) =>
          Object.values(err.constraints).join(', '),
        );
        throw new BadRequestException(errorMsgs.join(' && '));
      },
    }),
  );

  if (process.env.NODE_ENV.trim() == 'development') {
    app.use(morgan('tiny'));
  }

  await app.listen(
    config.get<number>('PORT'),
    config.get<string>('HOST'),
    (): void => {
      console.log(`Listening on ${config.get<number>('PORT')}`);
    },
  );
}
bootstrap();
