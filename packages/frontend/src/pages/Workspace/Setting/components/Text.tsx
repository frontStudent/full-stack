import {  useContext } from "react";
import { StoreCtx } from "../../context";
import RichTextExample from "./RichEditor";
import axios from "utils/Request";
import { serialize } from "./RichEditor";
const Text = () => {
  const { state, onChangeState } = useContext(StoreCtx);
  const initialValue = state.selectField.content;

  const handleUpdateBoxContent = (val: any) => {
    console.log(val,'val =================')
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
    axios.post("/box/update", {
      id: state.selectField.id,
      content: val.map((item) => serialize(item)).join(""),
    });
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
