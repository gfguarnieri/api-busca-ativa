import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { IAdminsRepository } from '@modules/admins/repositories/IAdminsRepository';
import { Conversation } from '@modules/students/infra/typeorm/entities/Conversation';
import { IConversationsRepository } from '@modules/students/repositories/IConversationsRepository';
import { IStudentsRepository } from '@modules/students/repositories/IStudentsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    description: string;
    fk_admin: string;
    fk_student: string;
    date?: Date
}

@injectable()
class UpdateConversationUseCase {
  constructor(
        @inject('ConversationsRepository') private conversationsRepository: IConversationsRepository,
        @inject('StudentsRepository') private studentsRepository: IStudentsRepository,
        @inject('AdminsRepository') private adminsRepository: IAdminsRepository,
  ) { }

  async execute(conversation_id: string, {
    description,
    fk_admin,
    fk_student,
    date,
  }: IRequest): Promise<Conversation> {
    const checkAdmin = await this.adminsRepository.findById(fk_admin);
    if (!checkAdmin) {
      throw new BuscaAtivaException('Admin not found.', 404);
    }

    const checkStudent = await this.studentsRepository.findById(fk_student);
    if (!checkStudent) {
      throw new BuscaAtivaException('Student not found.', 404);
    }

    const checkConversation = await this.conversationsRepository.findById(conversation_id);
    if (!checkConversation) {
      throw new BuscaAtivaException('Student not found.', 404);
    }

    const conversation = await this.conversationsRepository.update(conversation_id, {
      description,
      fk_admin,
      fk_student,
      date,
    });
    return conversation;
  }
}
export { UpdateConversationUseCase };
