import { Test, TestingModule } from '@nestjs/testing';
import { AttendeeController } from './attendee.controller';
import { getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { Attendee, AttendeeSchema } from '../schema/attendee.schema';
import { Talk, TalkSchema } from '../schema/talk.schema';
import { TalkController } from '../talk/talk.controller';
import { TalkService } from '../talk/talk.service';
import { AttendeeService } from './attendee.service';

describe('AttendeeController', () => {
  let controller: AttendeeController;
  let attendeeService: AttendeeService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let attendeeModel: Model<Attendee>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    attendeeModel = mongoConnection.model(Attendee.name, AttendeeSchema);
    attendeeService = new AttendeeService(attendeeModel);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendeeController],
      providers: [
        AttendeeService,
        { provide: getModelToken(Attendee.name), useValue: attendeeModel },
      ],
    }).compile();

    controller = module.get<AttendeeController>(AttendeeController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create attendee', () => {
    it('should be truthy', async () => {
      const newAttendee = await controller.createAttendees({
        email: 'john@gmail.com',
        name: 'John',
      });

      expect(newAttendee.name).toBe('John');
      expect(newAttendee).toBeTruthy();
    });
  });
});
