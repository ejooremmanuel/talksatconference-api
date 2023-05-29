import * as mongoose from 'mongoose';
import { Attendee } from './attendee.schema';
export type ChatDocument = mongoose.HydratedDocument<Chat>;
export declare class Chat {
    sender: Attendee;
    message: string;
    dateCreated: Date;
}
export declare const ChatSchema: mongoose.Schema<Chat, mongoose.Model<Chat, any, any, any, mongoose.Document<unknown, any, Chat> & Omit<Chat & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Chat, mongoose.Document<unknown, {}, mongoose.FlatRecord<Chat>> & Omit<mongoose.FlatRecord<Chat> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
