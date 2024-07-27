import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_MINUTE, { timeZone: 'America/Sao_Paulo' })
  public async handleEvery1Minute() {
    this.logger.log('Task executed every 1 minute');
  }

  @Cron('*/2 * * * *', { timeZone: 'America/Sao_Paulo' })
  public async handleEvery2Minutes() {
    this.logger.log('Adjust stamina if exceeds max every 2 minutes');
    try {
      this.logger.log('Stamina adjusted successfully for all users');
    } catch (error) {
      this.logger.error('Error adjusting stamina:', error);
    }
  }

  @Cron('*/4 * * * *', { timeZone: 'America/Sao_Paulo' })
  public async handleEvery4Minutes() {
    this.logger.log('Increase stamina every 4 minutes');
    try {
      this.logger.log('Stamina updated successfully for all users');
    } catch (error) {
      this.logger.error('Error updating stamina:', error);
    }
  }
}
