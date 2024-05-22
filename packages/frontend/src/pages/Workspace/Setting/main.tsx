import React, { useContext } from "react";
import { StoreCtx } from "../context";
import { Tabs } from "antd";
import Single from "./Single";
import Whole from "./Whole";
const items = [
  {
    key: "resume",
    label: "整体配置",
    children: <Whole />,
  },
  {
    key: "box",
    label: "单体配置",
    children: <Single />,
  },
];
const SettingContainer = () => {
  const { state, onChangeState } = useContext(StoreCtx);
  const onChange = (key: string) => {
    onChangeState({ selectType: key });
  };
  return (
    <div className="p-1">
      <Tabs
        activeKey={state.selectType}
        items={items}
        onChange={onChange}
        centered
      />
    </div>
  );
};
export default SettingContainer;
