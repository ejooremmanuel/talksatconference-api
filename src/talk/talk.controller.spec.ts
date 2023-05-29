import { Test, TestingModule } from '@nestjs/testing';
import { TalkController } from './talk.controller';
import { TalkService } from './talk.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { Talk, TalkSchema } from '../schema/talk.schema';
import { Attendee, AttendeeSchema } from '../schema/attendee.schema';
import { getModelToken } from '@nestjs/mongoose';
import { HttpStatus } from '@nestjs/common';

describe('TalkController', () => {
  let controller: TalkController;
  let talkService: TalkService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let talkModel: Model<Talk>;
  let attendeeModel: Model<Attendee>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    talkModel = mongoConnection.model(Talk.name, TalkSchema);
    attendeeModel = mongoConnection.model(Attendee.name, AttendeeSchema);
    talkService = new TalkService(talkModel, attendeeModel);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalkController],
      providers: [
        TalkService,
        { provide: getModelToken(Talk.name), useValue: talkModel },
        { provide: getModelToken(Attendee.name), useValue: attendeeModel },
      ],
    }).compile();

    controller = module.get<TalkController>(TalkController);
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

  describe('postTalk', () => {
    it('should return the saved object', async () => {
      const createdTalk = await controller.createTalk({
        attendee: '',
        title: 'Test Talk',
      });

      expect(createdTalk['title']).toBe('Test Talk');
      expect(createdTalk).toBeTruthy();
    });
  });
  describe('add attendee to a talk', () => {
    it('should add attendee to a talk', async () => {
      const createdTalk = await controller.createTalk({
        attendee: '',
        title: 'Test Talk',
      });
      const attendee = await attendeeModel.create({
        email: 'joor@gmail.com',
        name: 'joor',
      });
      const updatedTalk = await controller.addAttendeeToTalk(
        createdTalk.id.toString(),
        {
          attendee: attendee._id.toString(),
          title: 'Test Talk',
        },
      );

      expect(updatedTalk.attendees.length).toBe(1);
      expect(updatedTalk).toBeTruthy();
    });
  });
});
