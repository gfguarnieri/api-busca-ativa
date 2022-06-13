import { ICreateConversationDTO } from '@modules/students/dtos/ICreateConversationDTO';
import { IFilterConversations } from '@modules/students/dtos/IFilterConversationsDTO';
import { IConversationsRepository } from '@modules/students/repositories/IConversationsRepository';
import { Repository } from 'typeorm';

import { dataSource } from '@shared/infra/typeorm';

import { Conversation } from '../entities/Conversation';

class ConversationsRepository implements IConversationsRepository {
  private repository: Repository<Conversation>;

  constructor() {
    this.repository = dataSource.getRepository(Conversation);
  }

  async create({
    description, fk_admin, fk_student, date,
  }: ICreateConversationDTO): Promise<Conversation> {
    const conversation = this.repository.create({
      description, fk_admin, fk_student, date,
    });
    await this.repository.save(conversation);
    return conversation;
  }

  async update(conversation_id: string, {
    description, fk_admin, fk_student, date,
  }: ICreateConversationDTO): Promise<Conversation> {
    const conversation = this.repository.create({
      id: conversation_id,
      description,
      fk_admin,
      fk_student,
      date,
    });
    await this.repository.save(conversation);
    return conversation;
  }

  async delete(conversation_id: string): Promise<void> {
    await this.repository.delete({ id: conversation_id });
  }

  async findById(conversation_id: string): Promise<Conversation> {
    const conversation = await this.repository.findOneBy({ id: conversation_id });
    return conversation;
  }

  async filter({ start, end, fk_student }: IFilterConversations): Promise<Conversation[]> {
    const query = this.repository.createQueryBuilder('conversation');
    query.innerJoinAndSelect('conversation.student', 'student');
    if (fk_student) {
      query.where('conversation.fk_student=:fk_student', { fk_student });
      if (start && end) {
        query.andWhere('conversation.date>=:start', { start });
        query.andWhere('conversation.date<=:end', { end });
      }
    } else if (!fk_student && (start && end)) {
      query.where('conversation.date>=:start AND conversation.date<=:end', { start, end });
    }
    const conversations = await query.getMany();
    return conversations;
  }
}

export { ConversationsRepository };
