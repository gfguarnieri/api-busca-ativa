import { ICreateConversationDTO } from '../dtos/ICreateConversationDTO';
import { IFilterConversations } from '../dtos/IFilterConversationsDTO';
import { Conversation } from '../infra/typeorm/entities/Conversation';

interface IConversationsRepository{
    create(data:ICreateConversationDTO): Promise<Conversation>
    update(conversation_id: string, data:ICreateConversationDTO): Promise<Conversation>
    delete(conversation_id: string): Promise<void>
    filter(filter: IFilterConversations): Promise<Conversation[]>
    findById(conversation_id: string): Promise<Conversation>
}

export { IConversationsRepository };
