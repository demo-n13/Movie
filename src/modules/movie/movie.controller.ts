import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseFilters } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dtos';
import { ExceptionHandlerFilter } from 'src/filters';
// import { CreateMovieResponse } from './interfaces';

@Controller({
  path: 'movies',
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('/')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseFilters(ExceptionHandlerFilter)
  async getMovies(@Query() queries: Record<string, string>): Promise<any[]> {
    return await this.movieService.getAllMovies(queries);
  }

  @Get('/:movieId')
  async getSingleMovie(@Param('movieId') movieId: string): Promise<any> {
    return await this.movieService.getSingleMovie(+movieId);
  }

  @Post('/add')
  @UseFilters(ExceptionHandlerFilter)
  async addMovie(@Body() createMovieData: CreateMovieDto): Promise<any> {
    return await this.movieService.createMovie(createMovieData);
  }
}
