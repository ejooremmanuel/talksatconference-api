import { Document, Types } from 'mongoose';
import { Attendee } from '../../schema/attendee.schema';
import { Chat } from '../../schema/chat.schema';

export class ChatResponse {
  id: Types.ObjectId;
  talk: string;
  message: string;
  sender: Attendee;

  static from(
    data: Document<unknown, {}, Chat> &
      Omit<
        Chat & {
          _id: Types.ObjectId;
        },
        never
      >,
    talk: string,
  ) {
    return {
      id: data._id,
      talk,
      message: data.message,
      sender: data.sender,
    };
  }
}
