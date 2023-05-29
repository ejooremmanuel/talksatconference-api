import { Document, Types } from 'mongoose';
import { Attendee } from 'src/schema/attendee.schema';
export declare class AttendeeResponse {
    id: Types.ObjectId;
    name: string;
    emailAddress: string;
    static from(data: Document<unknown, {}, Attendee> & Omit<Attendee & {
        _id: Types.ObjectId;
    }, never>): {
        id: Types.ObjectId;
        name: string;
        emailAddress: string;
    };
}
