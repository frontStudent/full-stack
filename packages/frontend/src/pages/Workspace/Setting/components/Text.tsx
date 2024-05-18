import {  useContext } from "react";
import { StoreCtx } from "../../context";
import RichTextExample from "./RichEditor";

const Text = () => {
  const { state, onChangeState } = useContext(StoreCtx);
  const initialValue = state.selectField.content;
  console.log(initialValue, 'initialValue')
  const handleUpdateBoxContent = (val: string) => {
    const newSections = state.sections.map((sec) =>
      sec.boxes.find((box) => box.id === state.selectField.id)
        ? {
            ...sec,
            boxes: sec.boxes.map((box) =>
              box.id === state.selectField.id ? { ...box, content: val } : box
            ),
          }
        : sec
    );
    onChangeState({ sections: newSections });
  };
  return (
    <div className="p-4">
      <RichTextExample
        initialValue={initialValue}
        onUpdate={handleUpdateBoxContent}
      />
    </div>
  );
};

export default Text;
