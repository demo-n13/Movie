import { Injectable } from '@nestjs/common';
import { CreateMovieRequest, CreateMovieResponse } from './interfaces';
import { PgService } from 'src/postgres/pg.service';

export declare interface Movie {
  id: number;
  name: string;
  rating: number;
  year: number;
}

@Injectable()
export class MovieService {
  constructor(private readonly postgres: PgService) {}

  async getAllMovies(): Promise<any[]> {
    return await this.postgres.fetchData('SELECT * FROM movies');
  }

  async getSingleMovie(movieId: number): Promise<any> {
    return await this.postgres.fetchData(
      'SELECT * FROM movies WHERE id = $1',
      movieId,
    );
  }

  async createMovie(payload: CreateMovieRequest): Promise<any> {
    const newMovie = await this.postgres.fetchData(
      `INSERT INTO movies (name, rating, year) VALUES ($1, $2, $3) RETURNING *`,
      payload.name,
      payload.rating,
      payload.year,
    );

    return newMovie;
  }
}
