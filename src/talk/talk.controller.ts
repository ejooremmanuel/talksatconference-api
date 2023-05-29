import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { TalkService } from './talk.service';
import { TalkDto } from './data/data.request';
import { TalkResponse } from './data/data.response';

@Controller('talk')
export class TalkController {
  constructor(private talkService: TalkService) {}

  @ApiTags('Create new talk')
  @Post()
  async createTalk(@Body() data: TalkDto): Promise<TalkResponse> {
    HttpStatus.CREATED;
    return this.talkService.createTalk(data);
  }

  @ApiTags('Add attendee to a talk')
  @ApiParam({
    name: 'id',
  })
  @Put(':id/attendee')
  async addAttendeeToTalk(
    @Param('id') id: string,
    @Body() data: TalkDto,
  ): Promise<TalkResponse> {
    return this.talkService.addAttendeeToTalk(id, data.attendee);
  }
  @ApiTags('Get all chats for a talk')
  @Get(':id')
  async getTalkChats(@Param('id') id: string): Promise<TalkResponse> {
    return this.talkService.getTalkChats(id);
  }
  @ApiTags('Remove a talk')
  @Delete(':id')
  async removeTalk(@Param('id') id: string): Promise<void> {
    await this.talkService.removeTalk(id);
  }
}
