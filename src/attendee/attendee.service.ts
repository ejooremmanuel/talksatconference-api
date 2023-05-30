import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendee } from '../schema/attendee.schema';
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
      throw new HttpException(
        error?.message,
        error?.status || error?.response?.statusCode || 400,
        {
          cause: error,
        },
      );
    }
  }

  async getAttendees(): Promise<AttendeeResponse[]> {
    try {
      const foundAttendees = await this.attendeeModel.find();

      const data: AttendeeResponse[] = [];

      for (let item of foundAttendees) {
        const res = AttendeeResponse.from(item);
        data.push(res);
      }

      return data;
    } catch (error) {
      throw new HttpException(
        error?.message,
        error?.status || error?.response?.statusCode || 500,
        {
          cause: error,
        },
      );
    }
  }
}
