import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
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
  async createAttendee(@Body() data: AttendeeDto): Promise<AttendeeResponse> {
    return this.attendeeService.createAttendee(data);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiTags('Get Attendees')
  async getAttendees(): Promise<AttendeeResponse[]> {
    return this.attendeeService.getAttendees();
  }
}
