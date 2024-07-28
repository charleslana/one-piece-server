import { Module } from '@nestjs/common';
import { NewspaperController } from './newspaper.controller';
import { NewspaperRepository } from './newspaper.repository';
import { NewspaperService } from './newspaper.service';
import { PrismaModule } from '@/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [NewspaperService, NewspaperRepository],
  controllers: [NewspaperController],
  exports: [NewspaperService],
})
export class NewspaperModule {}
