import { Module } from '@nestjs/common';
import { AuthController } from './auth.controllers';
import { AuthService } from './auth.services';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.modules';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import {
  UserSettings,
  UserSettingsSchema,
} from 'src/schemas/UserSettings.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserSettings.name,
        schema: UserSettingsSchema,
      },
    ]),
    ConfigModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
