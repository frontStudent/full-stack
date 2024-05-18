import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Home",
    key: "home",
    icon: <MailOutlined />,
  },
  {
    label: "Login",
    key: "login",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Workspace",
    key: "workspace",
    icon: <SettingOutlined />,
  },
  {
    label: "User",
    key: "user",
    icon: <UserOutlined />,
  },
];

const Navigator: React.FC = () => {
  const [current, setCurrent] = useState("mail")

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    window.location.href = `/#/${e.key}`;
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Navigator;
