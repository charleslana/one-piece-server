import { AuthGuard } from '../auth/auth.guard';
import { CreateNewspaperDto } from './dto/create-newspaper.dto';
import { FindOneParams } from '../find-one.params';
import { GetNewspaperDto } from './dto/get-newspaper.dto';
import { NewspaperService } from './newspaper.service';
import { plainToInstance } from 'class-transformer';
import { Request as RequestExpress } from 'express';
import { Response } from 'express';
import { RoleEnum } from '@prisma/client';
import { RoleGuard } from '../auth/role.guard';
import { UpdateNewspaperDto } from './dto/update-newspaper.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';

@Controller('newspaper')
export class NewspaperController {
  constructor(private readonly newspaperService: NewspaperService) {}

  private readonly logger = new Logger(NewspaperController.name);

  @UseGuards(AuthGuard, new RoleGuard([RoleEnum.admin]))
  @Post()
  public async createNewspaper(
    @Body() createNewspaperDto: CreateNewspaperDto,
    @Request() req: RequestExpress
  ) {
    this.logger.log(`createNewspaper: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(createNewspaperDto)}`);
    const newspaper = await this.newspaperService.create(createNewspaperDto);
    return plainToInstance(GetNewspaperDto, newspaper);
  }

  @UseGuards(AuthGuard, new RoleGuard([RoleEnum.admin]))
  @Put()
  async updateNewspaper(
    @Body() updateNewspaperDto: UpdateNewspaperDto,
    @Request() req: RequestExpress
  ) {
    this.logger.log(`updateNewspaper: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(updateNewspaperDto)}`);
    const newspaper = await this.newspaperService.update(updateNewspaperDto);
    return plainToInstance(GetNewspaperDto, newspaper);
  }

  @UseGuards(AuthGuard, new RoleGuard([RoleEnum.admin]))
  @Delete(':id')
  public async deleteNewspaper(
    @Param() params: FindOneParams,
    @Res() res: Response,
    @Request() req: RequestExpress
  ) {
    this.logger.log(`deleteNewspaper: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(params)}`);
    const { id } = params;
    const response = await this.newspaperService.exclude(id);
    return res.status(response.statusCode).json(response.toJson());
  }

  @UseGuards(AuthGuard)
  @Get()
  public async getNewspapers(@Request() req: RequestExpress): Promise<GetNewspaperDto[]> {
    this.logger.log(`getNewspapers: Request made to ${req.url}`);
    const newspapers = await this.newspaperService.getAll();
    return plainToInstance(GetNewspaperDto, newspapers);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  public async getNewspaper(@Param() params: FindOneParams, @Request() req: RequestExpress) {
    this.logger.log(`getNewspaper: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(params)}`);
    const { id } = params;
    const newspaper = await this.newspaperService.get(id);
    return plainToInstance(GetNewspaperDto, newspaper);
  }
}
