import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendee } from 'src/schema/attendee.schema';
import { Talk } from 'src/schema/talk.schema';
import { TalkDto } from './data/data.request';
import { TalkResponse } from './data/data.response';

@Injectable()
export class TalkService {
  constructor(
    @InjectModel(Talk.name) private talkModel: Model<Talk>,
    @InjectModel(Attendee.name) private attendeeModel: Model<Attendee>,
  ) {}

  async createTalk(data: TalkDto): Promise<TalkResponse> {
    try {
      const createdTalk = await this.talkModel.create({
        title: data.title,
      });
      return TalkResponse.from(createdTalk);
    } catch (error) {
      console.log(error);
      throw new HttpException('server error', 500, {
        cause: error,
      });
    }
  }

  async addAttendeeToTalk(
    talkId: string,
    attendeeId: string,
  ): Promise<TalkResponse> {
    try {
      const foundTalk = await this.talkModel
        .findById(talkId)
        .populate('attendee');

      if (!foundTalk) {
        throw new NotFoundException('talk not found');
      }

      const foundAttendee = await this.attendeeModel.findById(attendeeId);

      if (!foundAttendee) {
        throw new NotFoundException('attendee not found');
      }

      const findAttendeeInTalk = foundTalk.attendee.find(
        (it) => it.email === foundAttendee.email,
      );

      if (findAttendeeInTalk) {
        throw new BadRequestException('attendee already added to talk');
      }

      const updatedTalkWithNewAttendee = await this.talkModel.findByIdAndUpdate(
        talkId,
        {
          $push: {
            attendee: attendeeId,
          },
        },
        {
          new: true,
        },
      );
      return TalkResponse.from(updatedTalkWithNewAttendee);
    } catch (error) {
      throw new HttpException('server error', 500, {
        cause: error,
      });
    }
  }
  async removeTalk(talkId: string): Promise<void> {
    try {
      await this.talkModel.findByIdAndDelete(talkId);
    } catch (error) {
      throw new HttpException(`server error:${error.message}`, 500, {
        cause: error,
      });
    }
  }
}
