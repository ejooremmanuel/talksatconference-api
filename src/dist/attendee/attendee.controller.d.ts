import { AttendeeService } from './attendee.service';
import { AttendeeDto } from './data/data.request';
import { AttendeeResponse } from './data/data.response';
export declare class AttendeeController {
    private attendeeService;
    constructor(attendeeService: AttendeeService);
    createAttendee(data: AttendeeDto): Promise<AttendeeResponse>;
    getAttendees(): Promise<AttendeeResponse[]>;
}
