import {
  MiddlewareConsumer,
  Module,
  NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { PgService } from 'src/postgres/pg.service';
import { LoggerMiddleware } from 'src/middlewares';

@Module({
  providers: [PgService, MovieService],
  controllers: [MovieController],
})
export class MovieModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/movies');
  }
}
