import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BoxService } from './box.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';

@Controller('box')
export class BoxController {
  constructor(private readonly boxService: BoxService) {}

  @Post('add')
  create(@Body() createBoxDto: CreateBoxDto) {
    return this.boxService.create(createBoxDto);
  }

  @Get('queryAll')
  findAll() {
    return this.boxService.findAll();
  }

  @Get('query')
  findOne(@Query('id') id: string) {
    return this.boxService.findOne(id);
  }

  @Post('update')
  update(@Body('id') id: string, @Body() updateBoxDto: UpdateBoxDto) {
    return this.boxService.update(id, updateBoxDto);
  }

  @Get('delete')
  remove(@Query('id') id: string) {
    return this.boxService.remove(id);
  }
}
