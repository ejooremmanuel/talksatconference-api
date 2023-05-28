import { ApiProperty } from '@nestjs/swagger';

export class TalkDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  attendee: string;
}
