import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post('add')
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto);
  }

  @Get('queryAll')
  findAll() {
    return this.sectionService.findAll();
  }

  @Get('query')
  findOne(@Query('id') id: string) {
    return this.sectionService.findOne(id);
  }

  @Post('update')
  update(@Body('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
    return this.sectionService.update(id, updateSectionDto);
  }

  @Get('delete')
  remove(@Query('id') id: string) {
    return this.sectionService.remove(id);
  }
}
