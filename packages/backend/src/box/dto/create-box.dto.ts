import { BoxBaseInfo } from "share/types";
export class CreateBoxDto {
  id?: string;
  type: string;
  sectionId: string;
  content?: string;
  src?: string;
  initInfo: BoxBaseInfo;
}
