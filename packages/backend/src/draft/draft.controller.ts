import {
  Controller,
  Get,
  Post,
  Body,
  Query
} from '@nestjs/common';
import { DraftService } from './draft.service';
import { CreateDraftDto } from './dto/create-draft.dto';
import { UpdateDraftDto } from './dto/update-draft.dto';

@Controller('draft')
export class DraftController {
  constructor(private readonly draftService: DraftService) {}

  @Post('add')
  create(@Body() createDraftDto: CreateDraftDto) {
    return this.draftService.create(createDraftDto);
  }

  @Get('queryAll')
  findAll() {
    return this.draftService.findAll();
  }

  @Get('query')
  findOne(@Query('id') id: string) {
    return this.draftService.findOne(id);
  }

  @Post('update')
  update(@Body('id') id: string, @Body() updateDraftDto: UpdateDraftDto) {
    return this.draftService.update(id, updateDraftDto);
  }

  @Get('delete')
  remove(@Query('id') id: string) {
    return this.draftService.remove(id);
  }
}
