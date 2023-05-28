import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendee } from 'src/schema/attendee.schema';
import { AttendeeDto } from './data/data.request';
import { AttendeeResponse } from './data/data.response';

@Injectable()
export class AttendeeService {
  constructor(
    @InjectModel(Attendee.name) private attendeeModel: Model<Attendee>,
  ) {}

  async createAttendee(data: AttendeeDto): Promise<AttendeeResponse> {
    try {
      const createdAttendee = await this.attendeeModel.create(data);
      return AttendeeResponse.from(createdAttendee);
    } catch (error) {
      throw new HttpException('server error', 500, {
        cause: error,
      });
    }
  }
}
