import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Movie, MovieService } from './movie.service';
import { CreateMovieDto } from './dtos';
// import { CreateMovieResponse } from './interfaces';

@Controller({
  path: 'movies',
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('/')
  async getMovies(@Query() queries: Record<string, string>): Promise<any[]> {
    return await this.movieService.getAllMovies(queries);
  }

  @Get('/:movieId')
  async getSingleMovie(@Param('movieId') movieId: string): Promise<any> {
    return await this.movieService.getSingleMovie(+movieId);
  }

  @Post('/add')
  async addMovie(@Body() createMovieData: CreateMovieDto): Promise<any> {
    return await this.movieService.createMovie(createMovieData);
  }
}
