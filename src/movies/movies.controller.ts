import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { LocaleQuery } from '../common/queries/locale.query';
import { LocaleEnum } from '../utils/errors';
import {
  ApiBadRequestResponse,
  ApiBearerAuth, ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
import { ValidationException } from '../common/exceptions/validation.exception';
import { UserRolesEnum } from '../common/enums/user-roles.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RequestUserQuery } from '../common/queries/request-user.query';
import { CommentRequestDTO } from "./dto/comment.dto";

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiQuery({
    name: 'locale',
    description:
      'Allows to change the language of the error messages. If empty, default to "en"',
    required: false,
    enum: LocaleEnum,
    type: 'string',
  })
  @ApiQuery({
    name: 'page',
    description: 'Allows to change the page of the movieDB request',
    required: true,
    type: 'number',
  })
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [UserRolesEnum.USER])
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get all popular Movies',
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
  })
  @ApiUnprocessableEntityResponse({
    type: ValidationException,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
  })
  @Get()
  async getPopularMovies(
    @Param('page') page,
    @LocaleQuery() locale: LocaleEnum,
  ) {
    return await this.moviesService.getPopularMovies(page, locale);
  }

  @ApiQuery({
    name: 'locale',
    description:
      'Allows to change the language of the error messages. If empty, default to "en"',
    required: false,
    enum: LocaleEnum,
    type: 'string',
  })
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [UserRolesEnum.USER])
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get a movie by ID',
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
  })
  @ApiUnprocessableEntityResponse({
    type: ValidationException,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
  })
  @Get('/:id')
  async getOneMovie(@Param('id') id:number, @LocaleQuery() locale: LocaleEnum) {
    return await this.moviesService.getOneMovie(id, locale);
  }

  @ApiQuery({
    name: 'locale',
    description:
      'Allows to change the language of the error messages. If empty, default to "en"',
    required: false,
    enum: LocaleEnum,
    type: 'string',
  })
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Comment a movie',
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
  })
  @ApiUnprocessableEntityResponse({
    type: ValidationException,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
  })
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [UserRolesEnum.USER])
  @Post('comment/:id')
  async commentAMovie(
    @Body() data : CommentRequestDTO,
    @RequestUserQuery() user,
    @Param('id') id: number,
    @LocaleQuery() locale: LocaleEnum,
  ) {
    return await this.moviesService.commentOnAMovie(
      { ...data, movieId: id },
      locale,
      user.id,
    );
  }
}
