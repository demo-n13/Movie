import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { PgService } from 'src/postgres/pg.service';

@Module({
  providers: [PgService, MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
