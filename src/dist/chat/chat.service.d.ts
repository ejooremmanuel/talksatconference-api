import { Model } from 'mongoose';
import { Chat } from '../schema/chat.schema';
import { Talk } from '../schema/talk.schema';
import { Attendee } from '../schema/attendee.schema';
import { ChatDto } from './data/data.request';
export declare class ChatService {
    private readonly chatModel;
    private readonly talkModel;
    private readonly attendeeModel;
    constructor(chatModel: Model<Chat>, talkModel: Model<Talk>, attendeeModel: Model<Attendee>);
    getChats(): Promise<Chat[]>;
    saveChat(chat: ChatDto): Promise<void>;
}
