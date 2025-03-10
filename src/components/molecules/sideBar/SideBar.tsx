import { Layout, Menu, theme } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./sideBar.css";
import { useSelector } from "react-redux";
import { AppState } from "#store/store.ts";

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
  const currentTheme = useSelector((state: AppState) => state.theme.theme);
  const navigate = useNavigate();
  const location = useLocation();

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
      style={{
        background:
          currentTheme === "light"
            ? "var(--white-transparent)"
            : "var(--black-transparent)",
      }}
    >
      <Menu
        className="custom-menu"
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={itemsLabels}
        onClick={handleMenuClick}
        style={{
          background: "none",
        }}
      />
    </Sider>
  );
};

export default Sidebar;
