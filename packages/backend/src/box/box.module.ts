import { Module } from '@nestjs/common';
import { BoxService } from './box.service';
import { BoxController } from './box.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Box } from './entities/box.entity';
import { Section } from 'src/section/entities/section.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Box, Section])],
  controllers: [BoxController],
  providers: [BoxService],
})
export class BoxModule {}
