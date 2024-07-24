import { AuthGuard } from '../auth/auth.guard';
import { FilterUserCharacterDto } from './dto/filter-user-character.dto';
import { FindOneParams } from '../find-one.params';
import { GetUserCharacterDto, GetUserCharacterExposeDto } from './dto/get-ser-character-dto';
import { PageDto } from '@/dto/page.dto';
import { plainToInstance } from 'class-transformer';
import { Request as RequestExpress } from 'express';
import { UpdateUserCharacterDto } from './dto/update-user-character.dto';
import { UserCharacterPaginatedDto } from './dto/user-character.paginated.dto';
import { UserCharacterService } from './user-character.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
  Query,
  Logger,
} from '@nestjs/common';

@Controller('user-character')
export class UserCharacterController {
  constructor(private readonly userCharacterService: UserCharacterService) {}

  private readonly logger = new Logger(UserCharacterController.name);

  @UseGuards(AuthGuard)
  @Get(':id')
  public async getUserCharacter(@Param() params: FindOneParams, @Request() req: RequestExpress) {
    this.logger.log(`getUserCharacter: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(params)}`);
    const { id } = params;
    const userCharacter = await this.userCharacterService.get(id);
    return plainToInstance(GetUserCharacterExposeDto, userCharacter);
  }

  @UseGuards(AuthGuard)
  @Get('all/paginated')
  public async getUserCharactersPaginated(
    @Query() page: PageDto,
    @Body() filterUserCharacterDto: FilterUserCharacterDto,
    @Request() req: RequestExpress
  ): Promise<UserCharacterPaginatedDto<GetUserCharacterExposeDto>> {
    this.logger.log(`getUserCharactersPaginated: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(page)}`);
    const userCharactersPaginated = await this.userCharacterService.getAllPaginated(
      page,
      filterUserCharacterDto
    );
    return plainToInstance(
      UserCharacterPaginatedDto<GetUserCharacterExposeDto>,
      userCharactersPaginated
    );
  }

  @UseGuards(AuthGuard)
  @Put()
  async updateUserCharacter(
    @Body() updateUserCharacterDto: UpdateUserCharacterDto,
    @Request() req: RequestExpress
  ) {
    this.logger.log(`updateUserCharacter: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(updateUserCharacterDto)}`);
    this.logger.log(`Data sent: ${JSON.stringify(req.user.sub)}`);
    updateUserCharacterDto.userId = req.user.sub;
    const user = await this.userCharacterService.updateUserCharacter(updateUserCharacterDto);
    return plainToInstance(GetUserCharacterDto, user);
  }
}
