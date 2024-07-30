import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { NewspaperModule } from './modules/newspaper/newspaper.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SocketModule } from './modules/socket/socket.module';
import { TaskService } from './task/task.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { UserAttributeModule } from './modules/user-attribute/user-attribute.module';
import { UserAvatarModule } from './modules/user-avatar/user-avatar.module';
import { UserController } from './modules/user/user.controller';
import { UserMessageModule } from './modules/user-message/user-message.module';
import { UserModule } from './modules/user/user.module';
import { UserNewspaperModule } from './modules/user-newspaper/user-newspaper.module';
import { ValidationInterceptor } from './helpers/interceptor/ValidationInterceptor';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    ThrottlerModule.forRoot([
      {
        ttl: 1 * 60000,
        limit: 100,
      },
    ]),
    SocketModule,
    UserAvatarModule,
    UserAttributeModule,
    NewspaperModule,
    UserNewspaperModule,
    UserMessageModule,
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ValidationInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    TaskService,
  ],
})
export class AppModule {}
