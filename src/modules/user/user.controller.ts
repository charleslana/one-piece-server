import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { FindOneParams } from '../find-one.params';
import { PageDto } from '@/dto/page.dto';
import { plainToInstance } from 'class-transformer';
import { Request as RequestExpress } from 'express';
import { Response } from 'express';
import { RoleEnum } from '@prisma/client';
import { RoleGuard } from '../auth/role.guard';
import { UpdateUserDto, UpdateUserPasswordDto } from './dto/update-user.dto';
import { UserPaginatedDto } from './dto/user.paginated.dto';
import { UserService } from './user.service';
import { UserSocketExistsGuard } from '../auth/user.socket.exists.guard';
import {
  GetTopUsersByCharacterClassDto,
  GetTopUsersByFactionDto,
  GetUserDto,
  GetUserExposeDto,
} from './dto/get-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  Request,
  UseGuards,
  Query,
  Logger,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger(UserController.name);

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto, @Request() req: RequestExpress) {
    this.logger.log(`createUser: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(createUserDto.email)}`);
    const user = await this.userService.create(createUserDto);
    return plainToInstance(GetUserDto, user);
  }

  @UseGuards(AuthGuard, new RoleGuard([RoleEnum.admin]))
  @Get()
  public async getUsers(@Request() req: RequestExpress): Promise<GetUserDto[]> {
    this.logger.log(`getUsers: Request made to ${req.url}`);
    const users = await this.userService.getAll();
    return plainToInstance(GetUserDto, users);
  }

  @UseGuards(AuthGuard, new RoleGuard([RoleEnum.admin]))
  @Delete(':id')
  public async deleteUser(
    @Param() params: FindOneParams,
    @Res() res: Response,
    @Request() req: RequestExpress
  ) {
    this.logger.log(`deleteUser: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(params)}`);
    const { id } = params;
    const response = await this.userService.exclude(id);
    return res.status(response.statusCode).json(response.toJson());
  }

  @UseGuards(AuthGuard)
  @Put('change-password')
  public async updateUserPassword(
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
    @Request() req: RequestExpress
  ) {
    this.logger.log(`updateUserPassword: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(req.user.sub)}`);
    updateUserPasswordDto.id = req.user.sub;
    const user = await this.userService.updateUserPassword(updateUserPasswordDto);
    return plainToInstance(GetUserDto, user);
  }

  @UseGuards(AuthGuard, UserSocketExistsGuard)
  @Get('me')
  public async getMe(@Request() req: RequestExpress) {
    this.logger.log(`getMe: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(req.user.sub)}`);
    const userId = req.user.sub;
    const user = await this.userService.get(userId);
    return plainToInstance(GetUserDto, user);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('filter')
  public async filterUsersPaginated(
    @Query() page: PageDto,
    @Body() filterUserDto: FilterUserDto,
    @Request() req: RequestExpress
  ): Promise<UserPaginatedDto<GetUserExposeDto>> {
    this.logger.log(`filterUsersPaginated: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(page)}`);
    this.logger.log(`Data sent: ${JSON.stringify(filterUserDto)}`);
    const usersPaginated = await this.userService.filterUsersPaginated(page, filterUserDto);
    return plainToInstance(UserPaginatedDto<GetUserExposeDto>, usersPaginated);
  }

  @UseGuards(AuthGuard)
  @Put()
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Request() req: RequestExpress) {
    this.logger.log(`updateUser: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(updateUserDto)}`);
    this.logger.log(`Data sent: ${JSON.stringify(req.user.sub)}`);
    updateUserDto.userId = req.user.sub;
    const user = await this.userService.updateUserCharacter(updateUserDto);
    return plainToInstance(GetUserDto, user);
  }

  @UseGuards(AuthGuard)
  @Get('top-by-faction')
  async getTopUsersByFaction(@Request() req: RequestExpress) {
    this.logger.log(`getTopUsersByFaction: Request made to ${req.url}`);
    const user = await this.userService.getTopUsersByFaction();
    return plainToInstance(GetTopUsersByFactionDto, user);
  }

  @UseGuards(AuthGuard)
  @Get('top-by-character-class')
  async getTopUsersByCharacterClass(@Request() req: RequestExpress) {
    this.logger.log(`getTopUsersByCharacterClass: Request made to ${req.url}`);
    const user = await this.userService.getTopUsersByCharacterClass();
    return plainToInstance(GetTopUsersByCharacterClassDto, user);
  }

  @UseGuards(AuthGuard)
  @Get('top-by-consecutive-victory')
  public async getTopUserByConsecutiveVictory(@Request() req: RequestExpress) {
    this.logger.log(`getTopUserByConsecutiveVictory: Request made to ${req.url}`);
    const user = await this.userService.getTopUserByConsecutiveVictory();
    return plainToInstance(GetUserExposeDto, user);
  }

  @UseGuards(AuthGuard)
  @Get('top-three-by-coin')
  async getTopThreeUsersByCoin(@Request() req: RequestExpress): Promise<GetUserExposeDto[]> {
    this.logger.log(`getTopThreeUsersByCoin: Request made to ${req.url}`);
    const users = await this.userService.getTopThreeUsersByCoin();
    return plainToInstance(GetUserExposeDto, users);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  public async getUser(@Param() params: FindOneParams, @Request() req: RequestExpress) {
    this.logger.log(`getUser: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(params)}`);
    const { id } = params;
    const user = await this.userService.get(id);
    return plainToInstance(GetUserExposeDto, user);
  }
}
