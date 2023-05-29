import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AttendeeService } from './attendee.service';
import { AttendeeDto } from './data/data.request';
import { AttendeeResponse } from './data/data.response';

@Controller('attendee')
export class AttendeeController {
  constructor(private attendeeService: AttendeeService) {}
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiTags('Add attendee')
  async createAttendees(@Body() data: AttendeeDto): Promise<AttendeeResponse> {
    return this.attendeeService.createAttendee(data);
  }
}
