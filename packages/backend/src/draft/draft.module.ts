import { Module } from '@nestjs/common';
import { DraftService } from './draft.service';
import { DraftController } from './draft.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Draft } from './entities/draft.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Draft, User])],
  controllers: [DraftController],
  providers: [DraftService],
})
export class DraftModule {}
