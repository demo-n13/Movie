import { IsInt, IsNumber, IsString, Max, Min } from 'class-validator';
import { CreateMovieRequest } from '../interfaces';

export class CreateMovieDto implements CreateMovieRequest {
  @IsString()
  name: string;

  @IsInt()
  @Max(new Date().getFullYear())
  @Min(1950)
  year: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
