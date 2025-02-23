import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import "./sideBar.css";

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
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const itemsLabels = menuItems.map((item) => ({
    key: item.route,
    label: item.label,
  }));

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key);
  };

  return (
    <Sider
      className="custom-sider"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="md"
      collapsedWidth="0"
      style={{ background: colorBgContainer }}
    >
      <Menu
        className="custom-menu"
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[menuItems[0]?.route]}
        items={itemsLabels}
        onClick={handleMenuClick}
        style={{ background: colorBgContainer }}
      />
    </Sider>
  );
};

export default Sidebar;
