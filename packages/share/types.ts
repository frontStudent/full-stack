export type BoxBaseInfo = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type Box = {
  id: string;
  type: string;
  content?: string;
  src?: string;
  initInfo: BoxBaseInfo;
  lastInfo?: BoxBaseInfo;
};

// 简历模块
export type Section = {
  id: string;
  type: string;
  title: string;
  titleStyle: string;
  boxes: Box[];
  width: number;
  height: number;
};

// 简历模板
export type Template = {
  id: string;
  name: string;
  sections: Section[];
}

// 简历草稿
export type Draft = {
  id: string;
  name: string;
  sections: Section[];
  createTime: Date;
  updateTime: Date;
};

export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  templates: Template[];
  drafts: Draft[];
  createTime: Date;
  updateTime: Date;
};