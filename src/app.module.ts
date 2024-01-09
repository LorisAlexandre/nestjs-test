import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.modules';
import { PostsModule } from './posts/posts.modules';
import { AuthModule } from './auth/auth.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_STRING'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    WebsocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
