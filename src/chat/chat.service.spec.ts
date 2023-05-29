import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { getModelToken } from '@nestjs/mongoose';
import { Attendee } from '../schema/attendee.schema';
import { Talk } from '../schema/talk.schema';
import { Model } from 'mongoose';
import { Chat } from '../schema/chat.schema';

describe('ChatService', () => {
  let service: ChatService;
  let talkModel: Model<Talk>;
  let attendeeModel: Model<Attendee>;
  let chatModel: Model<Chat>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        { provide: getModelToken(Talk.name), useValue: talkModel },
        { provide: getModelToken(Chat.name), useValue: chatModel },
        { provide: getModelToken(Attendee.name), useValue: attendeeModel },
        ChatGateway,
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('service should list chats', () => {
    it('should return an array', async () => {
      const allChats = await service.getChats();

      expect(allChats.length).toBeGreaterThan(0);
      expect(allChats).toBeTruthy();
    });
  });
});
