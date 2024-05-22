import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { DragItem } from "../types";
const DragBox = ({ id, content, src, title, type }: DragItem) => {
  const width = type === 'img' ? 100 : 150;
  const height = type === "img" ? 150 : 30;

  const [, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, content, src, title, type, width, height },
      // collect: (monitor) => ({
      //   isDragging: monitor.isDragging(),
      // }),
    }),
    [id]
  );
  return (
    <div
      className="bg-white rounded-sm shadow-md cursor-move text-center p-4"
      ref={drag}
    >
      {title}
    </div>
  );
};
export default DragBox;
