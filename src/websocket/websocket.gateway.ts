import {
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MyWebSocket implements OnGatewayInit {
  afterInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  onMessage(@MessageBody() data: any): WsResponse<unknown> {
    console.log(data);
    const event = 'sendMessage';
    this.server.emit('onMessage', { data });
    return { event, data };
  }
}
