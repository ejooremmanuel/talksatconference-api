import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendee } from 'src/schema/attendee.schema';
import { Talk } from 'src/schema/talk.schema';

@Injectable()
export class TalkService {
  constructor(
    @InjectModel(Talk.name) private talkModel: Model<Talk>,
    @InjectModel(Attendee.name) private attendeeModel: Model<Attendee>,
  ) {}
}
