import { AuthGuard } from '../auth/auth.guard';
import { CreateUserNewspaperDto } from './dto/create-user-newspaper.dto';
import { FindOneParams } from '../find-one.params';
import { GetUserNewspaperDto } from './dto/get-user-newspaper.dto';
import { plainToInstance } from 'class-transformer';
import { Request as RequestExpress } from 'express';
import { UserNewspaperService } from './user-newspaper.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

@Controller('user-newspaper')
export class UserNewspaperController {
  constructor(private readonly userNewspaperService: UserNewspaperService) {}

  private readonly logger = new Logger(UserNewspaperController.name);

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post()
  public async createUserNewspaper(
    @Body() createNewspaperDto: CreateUserNewspaperDto,
    @Request() req: RequestExpress
  ) {
    this.logger.log(`createUserNewspaper: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(createNewspaperDto)}`);
    this.logger.log(`Data sent: ${JSON.stringify(req.user.sub)}`);
    createNewspaperDto.userId = req.user.sub;
    const newspaper = await this.userNewspaperService.create(createNewspaperDto);
    return plainToInstance(GetUserNewspaperDto, newspaper);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Delete(':id')
  public async deleteUserNewspaper(@Param() params: FindOneParams, @Request() req: RequestExpress) {
    this.logger.log(`deleteUserNewspaper: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(params)}`);
    this.logger.log(`Data sent: ${JSON.stringify(req.user.sub)}`);
    const { id } = params;
    await this.userNewspaperService.exclude(id, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  public async getUserNewspapers(
    @Param() params: FindOneParams,
    @Request() req: RequestExpress
  ): Promise<GetUserNewspaperDto[]> {
    this.logger.log(`getUserNewspapers: Request made to ${req.url}`);
    const { id } = params;
    const newspapers = await this.userNewspaperService.getAll(id);
    return plainToInstance(GetUserNewspaperDto, newspapers);
  }
}
