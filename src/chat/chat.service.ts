import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from '../schema/chat.schema';
import { Talk } from '../schema/talk.schema';
import { Attendee } from '../schema/attendee.schema';
import { ChatDto } from './data/data.request';
import { ChatResponse } from './data/data.response';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    @InjectModel(Talk.name) private readonly talkModel: Model<Talk>,
    @InjectModel(Attendee.name) private readonly attendeeModel: Model<Attendee>,
  ) {}

  async getChats(): Promise<Chat[]> {
    try {
      return await this.chatModel.find();
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status || error?.response?.statusCode || 500,
        {
          cause: error,
        },
      );
    }
  }

  async saveChat(chat: ChatDto): Promise<Chat[]> {
    try {
      const findTalk = await this.talkModel
        .findById(chat.talk)
        .populate('attendee');

      if (!findTalk) {
        throw new BadRequestException('talk not found');
      }

      const findAttendeeDetails = await this.attendeeModel.findById(
        chat.sender,
      );
      if (!findAttendeeDetails) {
        throw new BadRequestException('attendee not found');
      }

      const checkIfAttendeeInTalk = findTalk.attendee.find(
        (it) => it.email === findAttendeeDetails.email,
      );

      if (!checkIfAttendeeInTalk) {
        throw new HttpException('attendee is not added to talk', 400);
      }

      const createdChat = new this.chatModel(chat);
      await createdChat.save();
      const updated = await this.talkModel
        .findByIdAndUpdate(chat.talk, {
          $push: {
            chat: createdChat,
          },
          new: true,
        })
        .populate({
          path: 'chat',
          populate: {
            path: 'sender',
          },
        });
      const findChats = updated.chat;
      return findChats;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || error?.response?.statusCode || 400,
        {
          cause: error,
        },
      );
    }
  }
}
