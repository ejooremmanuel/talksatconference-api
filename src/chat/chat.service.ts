import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from '../schema/chat.schema';
import { Talk } from '../schema/talk.schema';
import { Attendee } from '../schema/attendee.schema';
import { ChatDto } from './data/data.request';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    @InjectModel(Talk.name) private readonly talkModel: Model<Talk>,
    @InjectModel(Attendee.name) private readonly attendeeModel: Model<Attendee>,
  ) {}

  async getChats(): Promise<Chat[]> {
    return await this.chatModel.find();
  }

  async saveChat(chat: ChatDto): Promise<void> {
    try {
      const findTalk = await this.talkModel
        .findById(chat.talk)
        .populate('attendee');

      if (!findTalk) {
        throw new HttpException('talk not found', 400);
      }

      const findAttendeeDetails = await this.attendeeModel.findById(
        chat.sender,
      );
      if (!findAttendeeDetails) {
        throw new HttpException('attendee not found', 400);
      }

      const checkIfAttendeeInTalk = findTalk.attendee.find(
        (it) => it.email === findAttendeeDetails.email,
      );

      if (!checkIfAttendeeInTalk) {
        throw new HttpException('attendee is not added to talk', 400);
      }

      const createdChat = new this.chatModel(chat);
      await createdChat.save();
      await this.talkModel.findByIdAndUpdate(chat.talk, {
        $push: {
          chat: createdChat,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(`server error:${error.message}`, 500, {
        cause: error,
      });
    }
  }
}
