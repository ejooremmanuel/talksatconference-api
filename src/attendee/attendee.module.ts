import { Module } from '@nestjs/common';
import { AttendeeController } from './attendee.controller';
import { AttendeeService } from './attendee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendee, AttendeeSchema } from '../schema/attendee.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Attendee.name, schema: AttendeeSchema },
    ]),
  ],
  controllers: [AttendeeController],
  providers: [AttendeeService],
})
export class AttendeeModule {}
