import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { TalkService } from './talk.service';
import { Response } from 'express';
import { TalkDto } from './data/data.request';
import { ServerResponse } from '../types/ServerResponse';
import { TalkResponse } from './data/data.response';

@Controller('talk')
export class TalkController {
  constructor(private talkService: TalkService) {}

  @ApiTags('Create new talk')
  @Post()
  async createTalk(
    @Body() data: TalkDto,
  ): Promise<ServerResponse<TalkResponse>> {
    const newTalk = await this.talkService.createTalk(data);
    return {
      data: newTalk,
      status: HttpStatus.CREATED,
      success: true,
    };
  }

  @ApiTags('Add attendee to a talk')
  @ApiParam({
    name: 'id',
  })
  @Put(':id/attendee')
  async addAttendeeToTalk(
    @Param('id') id: string,
    @Body() data: TalkDto,
  ): Promise<ServerResponse<TalkResponse>> {
    const updatedTalk = await this.talkService.addAttendeeToTalk(
      id,
      data.attendee,
    );
    return {
      data: updatedTalk,
      status: HttpStatus.OK,
      success: true,
    };
  }
  @ApiTags('Get all chats for a talk')
  @Get(':id')
  async getTalkChats(
    @Param('id') id: string,
  ): Promise<ServerResponse<TalkResponse>> {
    const data = await this.talkService.getTalkChats(id);
    return {
      data,
      success: true,
      status: HttpStatus.OK,
    };
  }
  @ApiTags('Remove a talk')
  @Delete(':id')
  async removeTalk(
    @Param('id') id: string,
  ): Promise<ServerResponse<TalkResponse>> {
    await this.talkService.removeTalk(id);
    return {
      success: true,
      status: HttpStatus.OK,
    };
  }
}
