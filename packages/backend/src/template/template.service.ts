import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { User } from 'src/user/entities/user.entity';
import { Template } from './entities/template.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class TemplateService {
  @InjectRepository(Template)
  private templateRepository: Repository<Template>;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  async create(createTemplateDto: CreateTemplateDto) {
    const { name } = createTemplateDto;
    let newTemplate = new Template();
    newTemplate.users = [];
    newTemplate.name = name;
    newTemplate.sections = [];
    return await this.templateRepository.save(newTemplate);
  }

  async findAll() {
    return await this.templateRepository.find({
      relations: ['sections', 'user', 'sections.boxes'],
    });
  }

  async findOne(id: string) {
    return await this.templateRepository.findOne({
      where: { id },
      relations: ['sections', 'user'],
    });
  }

  async update(id: string, updateTemplateDto: UpdateTemplateDto) {
    return await this.templateRepository.update(id, updateTemplateDto);
  }

  async remove(id: string) {
    return await this.templateRepository.delete(id);
  }
}

