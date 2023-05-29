import * as mongoose from 'mongoose';
export type AttendeeDocument = mongoose.HydratedDocument<Attendee>;
export declare class Attendee {
    email: string;
    name: string;
    dateCreated: Date;
}
export declare const AttendeeSchema: mongoose.Schema<Attendee, mongoose.Model<Attendee, any, any, any, mongoose.Document<unknown, any, Attendee> & Omit<Attendee & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Attendee, mongoose.Document<unknown, {}, mongoose.FlatRecord<Attendee>> & Omit<mongoose.FlatRecord<Attendee> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
