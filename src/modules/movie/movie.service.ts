import { Injectable } from '@nestjs/common';
import { CreateMovieRequest } from './interfaces';
import { PgService } from '@postgres';
import { ApiFeature } from '@utils';

export declare interface Movie {
  id: number;
  name: string;
  rating: number;
  year: number;
}

@Injectable()
export class MovieService {
  constructor(private readonly postgres: PgService) {}

  async getAllMovies(queries: Record<string, string>): Promise<any> {
    console.log(queries.page);
    const query = new ApiFeature('movies')
      .paginate(+queries.page, +queries.limit)
      .limitFields(queries?.fields ? queries.fields.split(',') : ['*'])
      .sort("rating", "ASC")
      .getQuery();

    const data = await this.postgres.fetchData(query.queryString);
    return {
      limit: query.limit,
      page: query.page,
      data,
    };
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
