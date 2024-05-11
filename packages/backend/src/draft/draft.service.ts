import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDraftDto } from './dto/create-draft.dto';
import { UpdateDraftDto } from './dto/update-draft.dto';
import { Draft } from './entities/draft.entity';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class DraftService {
  @InjectRepository(Draft)
  private draftRepository: Repository<Draft>;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  async create(createDraftDto: CreateDraftDto) {
    const { userId, name } = createDraftDto;
    let newDraft = new Draft();

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['drafts'],
    });

    if (!user) {
      throw new InternalServerErrorException({
        message: '该用户不存在',
      });
    }
    newDraft.user = user;
    newDraft.name = name;
    newDraft.sections = [];
    return await this.draftRepository.save(newDraft);
  }

  async findAll() {
    return await this.draftRepository.find({ relations: ['sections', 'user', 'sections.boxes'] });
  }

  async findOne(id: string) {
    return await this.draftRepository.findOne({
      where: { id },
      relations: ['sections', 'user'],
    });
  }

  async update(id: string, updateDraftDto: UpdateDraftDto) {
    return await this.draftRepository.update(id, updateDraftDto);
  }

  async remove(id: string) {
    return await this.draftRepository.delete(id);
  }
}
