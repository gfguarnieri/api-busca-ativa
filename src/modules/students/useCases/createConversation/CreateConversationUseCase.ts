import { BuscaAtivaException } from '@errors/BuscaAtivaException';
import { IAdminsRepository } from '@modules/admins/repositories/IAdminsRepository';
import { Conversation } from '@modules/students/infra/typeorm/entities/Conversation';
import { IConversationsRepository } from '@modules/students/repositories/IConversationsRepository';
import { IStudentsRepository } from '@modules/students/repositories/IStudentsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    fk_student: string;
    fk_admin: string;
    description: string;
}

@injectable()
class CreateConversationUseCase {
  constructor(
        @inject('ConversationsRepository') private conversationsRepository: IConversationsRepository,
        @inject('StudentsRepository') private studentsRepository: IStudentsRepository,
        @inject('AdminsRepository') private adminsRepository: IAdminsRepository,
  ) { }

  async execute({ description, fk_admin, fk_student }: IRequest): Promise<Conversation> {
    const checkAdmin = await this.adminsRepository.findById(fk_admin);
    if (!checkAdmin) {
      throw new BuscaAtivaException('Admin not found', 404);
    }

    const checkStudent = await this.studentsRepository.findById(fk_student);
    if (!checkStudent) {
      throw new BuscaAtivaException('Admin not found', 404);
    }

    const conversation = await this.conversationsRepository.create({
      description,
      fk_admin,
      fk_student,
    });

    return conversation;
  }
}
export { CreateConversationUseCase };
