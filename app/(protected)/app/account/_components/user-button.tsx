"use client";
import { Dropdown, Avatar, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
// import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./logout";

export const UserButton = () => {
  //   const user = useCurrentUser();

  //   if (!user) return null;

  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: <LogoutButton />,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]}>
      <Avatar
        // src={user.image || undefined}
        icon={<UserOutlined />}
        className="cursor-pointer bg-sky-500"
      />
    </Dropdown>
  );
};
