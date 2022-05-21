import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [ TypeOrmModule.forRoot(), CatModule, AuthModule, UserModule, PassportModule, ActivityModule ],
  controllers: [AppController],
  providers: [AppService, UserService, AuthService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
  
})
export class AppModule {}
