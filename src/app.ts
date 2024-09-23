import { Module } from '@nestjs/common';
import { MovieModule } from './modules';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: ".env"
      isGlobal: true,
      load: [databaseConfig],
    }),
    MovieModule,
  ],
})
export class AppModule {}
