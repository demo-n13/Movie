import { IsArray, IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetMoviesQueriesDto {
  @IsNumberString()
  @IsOptional()
  limit?: number;

  @IsNumberString()
  @IsOptional()
  page?: number;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsArray()
  @IsOptional()
  fields?: string[];

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  rating?: string;

  @IsString()
  @IsOptional()
  year?: number;
}
