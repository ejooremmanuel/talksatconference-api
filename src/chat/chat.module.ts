import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendee, AttendeeSchema } from 'src/schema/attendee.schema';
import { Chat, ChatSchema } from 'src/schema/chat.schema';
import { Talk, TalkSchema } from 'src/schema/talk.schema';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Talk.name, schema: TalkSchema }]),
    MongooseModule.forFeature([
      { name: Attendee.name, schema: AttendeeSchema },
    ]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
