import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from 'src/template/entities/template.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(Template)
  private templateRepository: Repository<Template>;

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find({ relations: ['drafts'] });
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['drafts'],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async star(id: string, templateId: string) {
    const user = await this.findOne(id);
    const template = await this.templateRepository.findOne({
      where: { id: templateId },
    });
    user.templates.push(template);
    console.log(user, 'user');
    return await this.userRepository.save(user);
  }
}
