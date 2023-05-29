import { TalkService } from './talk.service';
import { TalkDto } from './data/data.request';
import { TalkResponse } from './data/data.response';
export declare class TalkController {
    private talkService;
    constructor(talkService: TalkService);
    createTalk(data: TalkDto): Promise<TalkResponse>;
    addAttendeeToTalk(id: string, data: TalkDto): Promise<TalkResponse>;
    getTalkChats(id: string): Promise<TalkResponse>;
    removeTalk(id: string): Promise<void>;
}
