import { Conversation } from '@modules/students/infra/typeorm/entities/Conversation';
import { IConversationsRepository } from '@modules/students/repositories/IConversationsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest{
    fk_student?: string;
    start?: Date;
    end?: Date;
}

@injectable()
class FilterConversationsUseCase {
  constructor(@inject('ConversationsRepository') private conversationsRepository: IConversationsRepository) {}
  async execute({ start, end, fk_student }: IRequest):Promise<Conversation[]> {
    const conversations = await this.conversationsRepository.filter({ start, end, fk_student });
    return conversations;
  }
}

export { FilterConversationsUseCase };
