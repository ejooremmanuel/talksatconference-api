import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendee } from 'src/schema/attendee.schema';
import { Talk } from 'src/schema/talk.schema';
import { TalkDto } from './data/data.request';

@Injectable()
export class TalkService {
  constructor(
    @InjectModel(Talk.name) private talkModel: Model<Talk>,
    @InjectModel(Attendee.name) private attendeeModel: Model<Attendee>,
  ) {}

  async createTalk(data: TalkDto): Promise<unknown> {
    try {
      const createdTalk = new this.talkModel({
        title: data.title,
      });
      return createdTalk.save();
    } catch (error) {
      console.log(error);
      throw new HttpException('server error', 500, {
        cause: error,
      });
    }
  }
}
