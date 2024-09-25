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
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, GetMoviesQueriesDto } from './dtos';
import { ParseIntCustomPipe } from '@pipes';
// import { CreateMovieResponse } from './interfaces';

@Controller({
  path: 'movies',
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('/')
  @HttpCode(HttpStatus.ACCEPTED)
  async getMovies(@Query() queries: GetMoviesQueriesDto): Promise<any[]> {
    return await this.movieService.getAllMovies(queries);
  }

  @Get('/:movieId')
  async getSingleMovie(
    @Param('movieId', new ParseIntCustomPipe(13)) movieId: number,
  ): Promise<any> {
    return await this.movieService.getSingleMovie(movieId);
  }

  @Post('/add')
  async addMovie(@Body() createMovieData: CreateMovieDto): Promise<any> {
    return await this.movieService.createMovie(createMovieData);
  }
}
