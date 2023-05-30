import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendee } from '../schema/attendee.schema';
import { Talk } from '../schema/talk.schema';
import { TalkDto } from './data/data.request';
import { TalkResponse } from './data/data.response';
import { TalkStatusEnum } from './types/talk-status.enum';

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
      throw new HttpException(
        error?.message,
        error?.status || error?.response?.statusCode || 400,
        {
          cause: error,
        },
      );
    }
  }

  async addAttendeeToTalk(
    talkId: string,
    attendeeId: string,
  ): Promise<TalkResponse> {
    try {
      if (!talkId || !attendeeId) {
        throw new BadRequestException('no id');
      }

      const foundTalk = await this.talkModel
        .findById(talkId)
        .populate('attendee');

      if (!foundTalk || foundTalk.status === TalkStatusEnum.IN_ACTIVE) {
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
      throw new HttpException(
        error?.message,
        error?.status || error?.response?.statusCode || 400,
        {
          cause: error,
        },
      );
    }
  }
  async removeTalk(talkId: string): Promise<void> {
    try {
      const findTalk = await this.talkModel
        .findById(talkId)
        .populate('chat attendee');

      if (
        findTalk &&
        (findTalk.attendee.length > 1 || findTalk.chat.length > 0)
      ) {
        await this.talkModel.findByIdAndUpdate(talkId, {
          $set: {
            status: TalkStatusEnum.IN_ACTIVE,
          },
        });
      }

      await this.talkModel.findByIdAndDelete(talkId);
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

  async getTalkChats(talkId: string): Promise<TalkResponse> {
    try {
      const foundTalk = await this.talkModel
        .findById(talkId)
        .populate({
          path: 'chat',
          populate: {
            path: 'sender',
          },
        })
        .populate('attendee');

      if (!foundTalk || foundTalk.status === TalkStatusEnum.IN_ACTIVE) {
        throw new NotFoundException('talk not found');
      }

      return TalkResponse.from(foundTalk);
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
  async getTalks(): Promise<TalkResponse[]> {
    try {
      const foundTalk = await this.talkModel
        .find()
        .populate({
          path: 'chat',
          populate: {
            path: 'sender',
          },
        })
        .populate('attendee');

      const data: TalkResponse[] = [];

      for (let item of foundTalk) {
        const res = TalkResponse.from(item);
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
