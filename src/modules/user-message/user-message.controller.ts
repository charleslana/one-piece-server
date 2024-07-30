import { AuthGuard } from '../auth/auth.guard';
import { CreateUserMessageDto } from './dto/create-user-message.dto';
import { FindOneParams } from '../find-one.params';
import { GetUserMessageDto } from './dto/get-user-message.dto';
import { plainToInstance } from 'class-transformer';
import { Request as RequestExpress } from 'express';
import { UserMessageService } from './user-message.service';
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
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

@Controller('user-message')
export class UserMessageController {
  constructor(private readonly userMessageService: UserMessageService) {}

  private readonly logger = new Logger(UserMessageController.name);

  @UseGuards(AuthGuard)
  @Post()
  public async createUserMessage(
    @Body() createUserMessageDto: CreateUserMessageDto,
    @Request() req: RequestExpress
  ) {
    this.logger.log(`createUserMessage: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(createUserMessageDto)}`);
    this.logger.log(`Data sent: ${JSON.stringify(req.user.sub)}`);
    createUserMessageDto.userId = req.user.sub;
    const create = await this.userMessageService.create(createUserMessageDto);
    return plainToInstance(GetUserMessageDto, create);
  }

  @UseGuards(AuthGuard)
  @Get()
  public async getUserMessages(@Request() req: RequestExpress): Promise<GetUserMessageDto[]> {
    this.logger.log(`getUserMessages: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(req.user.sub)}`);
    const getAll = await this.userMessageService.getAll(req.user.sub);
    return plainToInstance(GetUserMessageDto, getAll);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Put('read-all')
  public async readAllUserMessages(@Request() req: RequestExpress) {
    this.logger.log(`readAllUserMessages: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(req.user.sub)}`);
    await this.userMessageService.readMessageAll(req.user.sub);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Delete('all')
  public async deleteAllMessagesForUser(@Request() req: RequestExpress) {
    this.logger.log(`deleteAllMessagesForUser: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(req.user.sub)}`);
    await this.userMessageService.deleteAllMessagesForUser(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  public async readUserMessage(@Param() params: FindOneParams, @Request() req: RequestExpress) {
    this.logger.log(`readUserMessage: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(params)}`);
    this.logger.log(`Data sent: ${JSON.stringify(req.user.sub)}`);
    const { id } = params;
    const update = await this.userMessageService.readMessage(id, req.user.sub);
    return plainToInstance(GetUserMessageDto, update);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Delete(':id')
  public async deleteUserMessage(@Param() params: FindOneParams, @Request() req: RequestExpress) {
    this.logger.log(`deleteUserMessage: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(params)}`);
    this.logger.log(`Data sent: ${JSON.stringify(req.user.sub)}`);
    const { id } = params;
    await this.userMessageService.exclude(id, req.user.sub);
  }
}
