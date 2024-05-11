import { PartialType } from '@nestjs/mapped-types';
import { CreateBoxDto } from './create-box.dto';
import {BoxBaseInfo} from 'share/types'
// export class UpdateBoxDto extends PartialType(CreateBoxDto) {}
export class UpdateBoxDto {
  content?: string;
  src?: string;
  lastInfo: BoxBaseInfo;
}