import { Module } from '@nestjs/common';
import { MyWebSocket } from './websocket.gateway';

@Module({
  providers: [MyWebSocket],
})
export class WebsocketModule {}
