import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';
import morgan from 'morgan';
// import { ExceptionHandlerFilter } from './filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // Global ishlatishning 1-usuli
  // app.useGlobalFilters(new ExceptionHandlerFilter())

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
