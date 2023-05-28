import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AttendeeService } from './attendee.service';
import { AttendeeDto } from './data/data.request';
import { Response } from 'express';

@Controller('attendee')
export class AttendeeController {
  constructor(private attendeeService: AttendeeService) {}
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiTags('Add attendee')
  async createAttendees(
    @Res() res: Response,
    @Body() data: AttendeeDto,
  ): Promise<unknown> {
    const newAttendee = await this.attendeeService.createAttendee(data);
    return res.status(HttpStatus.CREATED).json({
      success: true,
      data: newAttendee,
    });
  }
}
