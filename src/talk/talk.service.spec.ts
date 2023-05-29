import { Test, TestingModule } from '@nestjs/testing';
import { TalkService } from './talk.service';
import { getModelToken } from '@nestjs/mongoose';
import { Attendee } from '../schema/attendee.schema';
import { Talk } from '../schema/talk.schema';
import { Model } from 'mongoose';

describe('TalkService', () => {
  let service: TalkService;
  let talkModel: Model<Talk>;
  let attendeeModel: Model<Attendee>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TalkService,
        { provide: getModelToken(Talk.name), useValue: talkModel },
        { provide: getModelToken(Attendee.name), useValue: attendeeModel },
      ],
    }).compile();

    service = module.get<TalkService>(TalkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
