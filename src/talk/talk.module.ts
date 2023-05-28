import { Module } from '@nestjs/common';
import { TalkController } from './talk.controller';

@Module({
  controllers: [TalkController]
})
export class TalkModule {}
