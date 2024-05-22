import { useContext } from "react";
import { StoreCtx } from "../../context";
import { Input, Checkbox } from "antd";
import axios from "utils/Request";

const Section = () => {
  const { state, onChangeState } = useContext(StoreCtx);

  const handleUpdateSectionName = (e: any) => {
    const newSections = state.sections.map((sec) =>
      sec.id === state.selectField.id ? { ...sec, name: e.target.value } : sec
    );
    axios.post("/section/update", {
      id: state.selectField.id,
      name: e.target.value,
    });
    onChangeState({ sections: newSections });
  };
  
  const handleToggleTitle = (e) => {
    const newSections = state.sections.map((sec) =>
      sec.id === state.selectField.id
        ? { ...sec, showTitle: e.target.checked ? "1" : "0" }
        : sec
    );
    axios.post("/section/update", {
      id: state.selectField.id,
      showTitle: e.target.checked ? '1' : '0',
    });
    onChangeState({ sections: newSections });
  }

  return (
    <div className="p-4">
      <Input
        defaultValue={state.selectField.name}
        onChange={handleUpdateSectionName}
      />
      <Checkbox onChange={handleToggleTitle}>Checkbox</Checkbox>
    </div>
  );
};

export default Section;
