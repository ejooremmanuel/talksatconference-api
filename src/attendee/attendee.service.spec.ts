import { Test, TestingModule } from '@nestjs/testing';
import { AttendeeService } from './attendee.service';
import { getModelToken } from '@nestjs/mongoose';
import { Attendee } from '../schema/attendee.schema';
import { Model } from 'mongoose';

describe('AttendeeService', () => {
  let service: AttendeeService;
  let attendeeModel: Model<Attendee>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttendeeService,
        { provide: getModelToken(Attendee.name), useValue: attendeeModel },
      ],
    }).compile();

    service = module.get<AttendeeService>(AttendeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
