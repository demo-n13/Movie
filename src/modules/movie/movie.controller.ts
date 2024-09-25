import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  // ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, GetMoviesQueriesDto } from './dtos';
import { ParseEnumPipeCustom, ParseIntCustomPipe } from '@pipes';
import { LoggingInterceptor } from '@interceptors';

enum StatusEnum {
  active,
  inactive,
}

@Controller({
  path: 'movies',
})
@UseInterceptors(LoggingInterceptor)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('/')
  @HttpCode(HttpStatus.ACCEPTED)
  async getMovies(@Query() queries: GetMoviesQueriesDto): Promise<any[]> {
    return await this.movieService.getAllMovies(queries);
  }

  @Get('/:movieId/:status')
  async getSingleMovie(
    @Param('movieId', new ParseIntCustomPipe(13)) movieId: number,
    @Param('status', new ParseEnumPipeCustom(StatusEnum)) status: string,
  ): Promise<any> {
    console.log(status);
    return await this.movieService.getSingleMovie(movieId);
  }

  @Post('/add')
  async addMovie(@Body() createMovieData: CreateMovieDto): Promise<any> {
    return await this.movieService.createMovie(createMovieData);
  }
}
