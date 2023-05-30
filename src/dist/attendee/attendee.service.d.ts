import { Model } from 'mongoose';
import { Attendee } from '../schema/attendee.schema';
import { AttendeeDto } from './data/data.request';
import { AttendeeResponse } from './data/data.response';
export declare class AttendeeService {
    private attendeeModel;
    constructor(attendeeModel: Model<Attendee>);
    createAttendee(data: AttendeeDto): Promise<AttendeeResponse>;
    getAttendees(): Promise<AttendeeResponse[]>;
}
