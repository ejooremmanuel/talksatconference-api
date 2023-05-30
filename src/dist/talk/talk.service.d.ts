import { Model } from 'mongoose';
import { Attendee } from '../schema/attendee.schema';
import { Talk } from '../schema/talk.schema';
import { TalkDto } from './data/data.request';
import { TalkResponse } from './data/data.response';
export declare class TalkService {
    private talkModel;
    private attendeeModel;
    constructor(talkModel: Model<Talk>, attendeeModel: Model<Attendee>);
    createTalk(data: TalkDto): Promise<TalkResponse>;
    addAttendeeToTalk(talkId: string, attendeeId: string): Promise<TalkResponse>;
    removeTalk(talkId: string): Promise<void>;
    getTalkChats(talkId: string): Promise<TalkResponse>;
    getTalks(): Promise<TalkResponse[]>;
}
