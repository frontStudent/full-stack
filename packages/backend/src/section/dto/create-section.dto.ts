export class CreateSectionDto {
  id?: string;
  draftId: string;
  name?: string;
  showTitle?: '0' | '1'; // 0: 不显示标题，1: 显示标题
  titleStyle?: string;
  width?: number;
  height?: number;
}
