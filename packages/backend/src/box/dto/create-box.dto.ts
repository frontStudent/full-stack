import { BoxBaseInfo } from "share/types";
export class CreateBoxDto {
    sectionId: string;
    content?: string;
    src?: string;
    initInfo: BoxBaseInfo;
}
