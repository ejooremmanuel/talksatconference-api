import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Attendee } from './attendee.schema';

export type ChatDocument = mongoose.HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attendee' })
  sender: Attendee;
  @Prop()
  message: string;
  @Prop({
    default: Date.now,
  })
  dateCreated: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
