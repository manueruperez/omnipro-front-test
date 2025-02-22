import { Layout, Menu } from "antd";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  menuItems: { label: string; route: string }[];
  onCollapse: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onCollapse,
  menuItems,
}) => {
  const itemsLabels = menuItems.map((item, index) => ({
    key: index,
    label: item.label,
  }));
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="md"
      collapsedWidth="0"
      style={{ background: "#001529" }}
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={itemsLabels}
      />
    </Sider>
  );
};

export default Sidebar;
