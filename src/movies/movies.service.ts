import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getError, LocaleEnum } from '../utils/errors';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { CommentRequestDTO } from './dto/comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsEntity } from '../database/entities/comments.entity';

@Injectable()
export class MoviesService {
  private readonly movie_api_key;
  private readonly movie_api_url;
  private readonly apiURL;
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentsRepository: Repository<CommentsEntity>,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.movie_api_key = configService.get<string>('movie_api_key');
    this.movie_api_url = configService.get<string>('movie_api_url');
  }

  async getPopularMovies(page: number, locale: LocaleEnum) {
    const URL = `${this.movie_api_url}movie/popular?api_key=${
      this.movie_api_key
    }&language=${locale == LocaleEnum.EN ? 'en-US' : 'es-ES'}&page=${page}`;
    return this.httpService.get(URL).pipe(map((response) => response.data));
  }

  async getOneMovie(movieId: number, locale: LocaleEnum) {
    const URL = `${this.movie_api_url}movie/${movieId}?api_key=${
      this.movie_api_key
    }&language=${locale == LocaleEnum.EN ? 'en-US' : 'es-ES'}`;
    console.log(URL);
    const comments = await this.commentsRepository.find({ movieId });
    console.log(comments);
    const movie = await this.httpService.get(URL).toPromise();
    console.log(movie.data);
    return {
      movie: movie.data,
      comments,
    };
  }

  async commentOnAMovie(
    data: CommentRequestDTO,
    locale: LocaleEnum,
    userId: number,
  ) {
    const URL = `${this.movie_api_url}movie/${data.movieId}?api_key=${
      this.movie_api_key
    }&language=${locale == LocaleEnum.EN ? 'en-US' : 'es-ES'}`;
    const movieResponse = await this.httpService.get(URL).toPromise();

    if (!movieResponse.data) {
      throw new BadRequestException(getError(locale).MoviesIDError);
    }
    return this.commentsRepository.save({ ...data, userId });
  }
}
