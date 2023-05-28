import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Attendee } from './attendee.schema';
import { Chat } from './chat.schema';

export type TalkDocument = mongoose.HydratedDocument<Talk>;

@Schema()
export class Talk {
  @Prop({
    unique: true,
    required: [true, 'add a title'],
  })
  title: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendee' }] })
  attendee: Attendee[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }] })
  chat: Chat[];
  @Prop({
    default: Date.now,
  })
  dateCreated: Date;
}

export const TalkSchema = SchemaFactory.createForClass(Talk);
