import { ICreateConversationDTO } from '@modules/students/dtos/ICreateConversationDTO';
import { IFilterConversations } from '@modules/students/dtos/IFilterConversationsDTO';
import { Conversation } from '@modules/students/infra/typeorm/entities/Conversation';

import { IConversationsRepository } from '../IConversationsRepository';

class InMemoryConversationsRepository implements IConversationsRepository {
  private conversationsRepository: Conversation[] = [];

  async create({
    description, fk_admin, fk_student, date,
  }: ICreateConversationDTO):
        Promise<Conversation> {
    const conversation = new Conversation();
    Object.assign(conversation, {
      description, fk_admin, fk_student, date,
    });
    this.conversationsRepository.push(conversation);
    return conversation;
  }

  async update(conversation_id: string, {
    description, fk_admin, fk_student, date,
  }: ICreateConversationDTO): Promise<Conversation> {
    const conversation = this.conversationsRepository.find(
      (conver) => conver.id === conversation_id,
    );
    Object.assign(conversation, {
      description,
      fk_admin,
      fk_student,
      date,
    });
    return conversation;
  }

  async delete(conversation_id: string): Promise < void> {
    const index = this.conversationsRepository.findIndex(
      (conversation) => conversation.id === conversation_id,
    );
    this.conversationsRepository.splice(index, 1);
  }

  async findById(conversation_id: string): Promise<Conversation> {
    const conversation = this.conversationsRepository.find(
      (conversation) => conversation.id === conversation_id,
    );
    return conversation;
  }

  async filter({ start, end, fk_student }: IFilterConversations): Promise<Conversation[]> {
    const conversations = this.conversationsRepository.filter(
      (conversation) => {
        if (!fk_student && (!start && !end)) {
          return true;
        }
        if (fk_student && !(start && end)) {
          return conversation.fk_student === fk_student;
        }
        if (fk_student && start && end) {
          return conversation.fk_student === fk_student
          && conversation.date >= start
          && conversation.date <= end;
        }
        if (!fk_student && (start && end)) {
          return conversation.date >= start
            && conversation.date <= end;
        }
        return false;
      },
    );
    return conversations;
  }
}

export { InMemoryConversationsRepository };
