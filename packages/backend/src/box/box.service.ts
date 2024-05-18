import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { Section } from 'src/section/entities/section.entity';
import { Box } from './entities/box.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoxService {
  @InjectRepository(Box)
  private boxRepository: Repository<Box>;

  @InjectRepository(Section)
  private sectionRepository: Repository<Section>;

  async create(createBoxDto: CreateBoxDto) {
    let newBox = new Box();
    const { id, sectionId, content, initInfo } = createBoxDto;
    const section = await this.sectionRepository.findOne({
      where: { id: sectionId },
      relations: ['boxes'],
    });

    if (!section) {
      throw new InternalServerErrorException({
        message: '该模块不存在',
      });
    }
    if(id) newBox.id = id;
    newBox.section = section;
    newBox.content = content;
    newBox.initInfo = initInfo;
    return await this.boxRepository.save(newBox);
  }

  async findAll() {
    return await this.boxRepository.find({
      relations: ['section'],
    });
  }

  async findOne(id: string) {
    return await this.boxRepository.findOne({
      where: { id },
      relations: ['section'],
    })
  }

  async update(id: string, updateBoxDto: UpdateBoxDto) {
    console.log(updateBoxDto, 'updateBoxDto');
    return await this.boxRepository.update(id, updateBoxDto);
  }

  async remove(id: string) {
    return await this.boxRepository.delete(id);
  }
}
