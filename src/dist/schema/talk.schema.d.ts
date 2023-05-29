import * as mongoose from 'mongoose';
import { Attendee } from './attendee.schema';
import { Chat } from './chat.schema';
export type TalkDocument = mongoose.HydratedDocument<Talk>;
export declare class Talk {
    title: string;
    status: string;
    attendee: Attendee[];
    chat: Chat[];
    dateCreated: Date;
}
export declare const TalkSchema: mongoose.Schema<Talk, mongoose.Model<Talk, any, any, any, mongoose.Document<unknown, any, Talk> & Omit<Talk & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Talk, mongoose.Document<unknown, {}, mongoose.FlatRecord<Talk>> & Omit<mongoose.FlatRecord<Talk> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
