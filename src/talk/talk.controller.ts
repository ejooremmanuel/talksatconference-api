import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { TalkService } from './talk.service';
import { Response } from 'express';
import { TalkDto } from './data/data.request';

@Controller('talk')
export class TalkController {
  constructor(private talkService: TalkService) {}

  @ApiTags('Create new talk')
  @Post()
  async createTalk(
    @Body() data: TalkDto,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const newTalk = await this.talkService.createTalk(data);
    return res.status(201).json({
      data: newTalk,
      success: true,
    });
  }

  @ApiTags('Add attendee to a talk')
  @ApiParam({
    name: 'id',
  })
  @Put(':id/attendee')
  async addAttendeeToTalk(
    @Param('id') id: string,
    @Body() data: TalkDto,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const updatedTalk = await this.talkService.addAttendeeToTalk(
      id,
      data.attendee,
    );
    return res.status(200).json({
      data: updatedTalk,
      success: true,
    });
  }
  @ApiTags('Get all chats for a talk')
  @Get(':id')
  async getTalkChats(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const data = await this.talkService.getTalkChats(id);
    return res.status(200).json({
      data,
      success: true,
    });
  }
  @ApiTags('Remove a talk')
  @Delete(':id')
  async removeTalk(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    await this.talkService.removeTalk(id);
    return res.status(200).json({
      success: true,
    });
  }
}
