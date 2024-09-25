import { Module } from '@nestjs/common';
import { MovieModule } from '@modules';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ExceptionHandlerFilter } from './filters';
import { CheckRolesGuard } from '@guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: ".env"
      isGlobal: true,
      load: [dbConfig],
    }),
    MovieModule,
  ],
  providers: [
    {
      useClass: ExceptionHandlerFilter,
      provide: APP_FILTER,
    },
    {
      useClass: CheckRolesGuard,
      provide: APP_GUARD,
    },
  ],
})
export class AppModule {}
