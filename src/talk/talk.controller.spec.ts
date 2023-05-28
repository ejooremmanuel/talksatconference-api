import { Test, TestingModule } from '@nestjs/testing';
import { TalkController } from './talk.controller';
import { TalkService } from './talk.service';

describe('TalkController', () => {
  let controller: TalkController;
  let talkService: TalkService;

  beforeEach(async () => {
    talkService = new TalkService(null, null);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalkController],
    }).compile();

    controller = module.get<TalkController>(TalkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
