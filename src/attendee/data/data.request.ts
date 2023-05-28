import { ApiProperty } from '@nestjs/swagger';

export class AttendeeDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
}
