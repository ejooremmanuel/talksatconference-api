import { Document, Types } from 'mongoose';
import { Attendee } from 'src/schema/attendee.schema';
import { Chat } from 'src/schema/chat.schema';
import { Talk } from 'src/schema/talk.schema';
export declare class TalkResponse {
    id: Types.ObjectId;
    attendees: Attendee[];
    chats: Chat[];
    title: string;
    static from(data: Document<unknown, {}, Talk> & Omit<Talk & {
        _id: Types.ObjectId;
    }, never>): {
        id: Types.ObjectId;
        attendees: Attendee[];
        chats: Chat[];
        title: string;
    };
}
