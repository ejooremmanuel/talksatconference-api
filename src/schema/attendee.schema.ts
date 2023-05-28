import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type AttendeeDocument = mongoose.HydratedDocument<Attendee>;

@Schema()
export class Attendee {
  @Prop({
    unique: true,
    required: [true, 'add an email'],
  })
  email: string;
  @Prop({
    unique: true,
    required: [true, 'add a name'],
  })
  name: string;
  @Prop({
    default: Date.now,
  })
  dateCreated: Date;
}

export const AttendeeSchema = SchemaFactory.createForClass(Attendee);
