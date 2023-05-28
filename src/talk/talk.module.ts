import { Module } from '@nestjs/common';
import { TalkController } from './talk.controller';
import { TalkService } from './talk.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendee, AttendeeSchema } from 'src/schema/attendee.schema';
import { Talk, TalkSchema } from 'src/schema/talk.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Talk.name, schema: TalkSchema }]),
    MongooseModule.forFeature([
      { name: Attendee.name, schema: AttendeeSchema },
    ]),
  ],
  controllers: [TalkController],
  providers: [TalkService],
})
export class TalkModule {}
