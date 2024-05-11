import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Draft } from 'src/draft/entities/draft.entity';
import { Section } from './entities/section.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class SectionService {
  @InjectRepository(Draft)
  private draftRepository: Repository<Draft>;

  @InjectRepository(Section)
  private sectionRepository: Repository<Section>;

  async create(createSectionDto: CreateSectionDto) {
    const { draftId } = createSectionDto;
    let newSection = new Section();

    const draft = await this.draftRepository.findOne({
      where: { id: draftId },
      relations: ['sections', 'user'],
    });

    if (!draft) {
      throw new InternalServerErrorException({
        message: '该草稿不存在',
      });
    }
    newSection.draft = draft;
    newSection.boxes = [];
    return await this.sectionRepository.save(newSection);
  }

  async findAll() {
    return await this.sectionRepository.find({
      relations: ['draft', 'boxes'],
    });
  }

  async findOne(id: string) {
    return await this.sectionRepository.findOne({
      where: { id },
      relations: ['section'],
    });
  }

  async update(id: string, updateSectionDto: UpdateSectionDto) {
    return await this.sectionRepository.update(id, updateSectionDto);
  }

  async remove(id: string) {
    return await this.sectionRepository.delete(id);
  }
}
