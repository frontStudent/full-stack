import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { Draft } from 'src/draft/entities/draft.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Section, Draft])],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
