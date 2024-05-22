import DragBox from "./DragBox";
import { DragItem } from "../types";

const boxes = [
  {
    id: "1",
    title: "文本编辑组件",
    content: [
      {
        type: "paragraph",
        align: "left",
        children: [{ text: "Hello11" }],
      },
    ],
    src: "",
    type: "editor",
  },
  {
    id: "1",
    title: "照片上传组件",
    content: [],
    src: "",
    type: "img",
  }
];

const DragArea = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {boxes.map(({ id, content, src, title, type }: DragItem) => {
        return (
          <DragBox
            key={id}
            id={id}
            src={src}
            content={content}
            title={title}
            type={type}
          ></DragBox>
        );
      })}
    </div>
  );
};

export default DragArea;
