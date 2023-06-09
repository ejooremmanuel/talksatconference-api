import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TalkModule } from './talk/talk.module';
import { ChatModule } from './chat/chat.module';
import { AttendeeModule } from './attendee/attendee.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    TalkModule,
    ChatModule,
    AttendeeModule,
  ],
})
export class AppModule {}
