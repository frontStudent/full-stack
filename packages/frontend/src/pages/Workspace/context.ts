import { createContext } from "react";
import { Section } from "./types";
export type GlobalContent = {
  state: {
    sections: Section[];
    selectField: any;
    selectType: string;
  };
  onChangeState: (s: any) => void;
};
export const StoreCtx = createContext<GlobalContent>({
  state: {
    sections: [
      {
        id: "1",
        type: "section",
        title: "shrek",
        titleStyle: "shrek",
        height: 100,
        width: 550,
        boxes: [],
      },
      {
        id: "2",
        type: "section",
        title: "fiona",
        titleStyle: "shrek",
        height: 100,
        width: 550,
        boxes: [],
      },
      {
        id: "3",
        type: "section",
        title: "fiona",
        titleStyle: "shrek",
        height: 100,
        width: 550,
        boxes: [],
      },
    ],
    selectField: {},
    selectType: "resume",
  },
  onChangeState: () => {},
});
