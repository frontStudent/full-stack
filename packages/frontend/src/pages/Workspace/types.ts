import { Descendant } from "slate";

export type DragItem = {
  id: string;
  title: string;
  type: string;
  content: Descendant[];
  src: string;
  width?: number;
  height?: number;
};

export type BoxBaseInfo = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type Box = {
  id: string;
  type: string;
  content: Descendant[];
  src?: string;
  initInfo: BoxBaseInfo;
  lastInfo?: BoxBaseInfo;
};

// 简历模块
export type Section = {
  id: string;
  type: string;
  name: string;
  titleStyle: string;
  showTitle: '0' | '1';
  boxes: Box[];
  width: number;
  height: number;
};

export type SelectedField = Section | Box | {};

export type BoxMutateHelper = (
  id: string, // box所在section的id，并非box的id
  newItem: Box,
  op: "add" | "update" | "delete"
) => void;

export type SectionMutateHelper = (
  id: string,
  op: "add" | "update" | "delete"
) => void;

export type ResizeHelper = (
  id: string,
  size: { width: number; height: number }
) => void;

export type SectionProps = {
  item: Section;
  onMutateBox: BoxMutateHelper;
  onMutateSection: SectionMutateHelper;
  onResize: ResizeHelper;
};
