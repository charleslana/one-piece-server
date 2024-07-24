import { AuthGuard } from '../auth/auth.guard';
import { AvatarService } from './avatar.service';
import { Body, Controller, Get, Logger, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { FindOneParams } from '../find-one.params';
import { GetAvatarDto } from './dto/get-avatar.dto';
import { plainToInstance } from 'class-transformer';
import { Request as RequestExpress } from 'express';
import { RoleEnum } from '@prisma/client';
import { RoleGuard } from '../auth/role.guard';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  private readonly logger = new Logger(AvatarController.name);

  @UseGuards(AuthGuard, new RoleGuard([RoleEnum.admin]))
  @Post()
  public async createAvatar(
    @Body() createAvatarDto: CreateAvatarDto,
    @Request() req: RequestExpress
  ) {
    this.logger.log(`createAvatar: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(createAvatarDto)}`);
    const user = await this.avatarService.create(createAvatarDto);
    return plainToInstance(GetAvatarDto, user);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  public async getAvatar(@Param() params: FindOneParams, @Request() req: RequestExpress) {
    this.logger.log(`getAvatar: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(params)}`);
    this.logger.log(`Data sent: ${JSON.stringify(req.user.sub)}`);
    const { id } = params;
    const avatar = await this.avatarService.get(id, req.user.sub);
    return plainToInstance(GetAvatarDto, avatar);
  }

  @UseGuards(AuthGuard)
  @Get()
  public async getAvatars(@Request() req: RequestExpress): Promise<GetAvatarDto[]> {
    this.logger.log(`getAvatars: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(req.user.sub)}`);
    const avatars = await this.avatarService.getAll(req.user.sub);
    return plainToInstance(GetAvatarDto, avatars);
  }
}
