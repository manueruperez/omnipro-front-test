import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";

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

  // Obtenemos el token que contiene el color de fondo actualizado según el tema
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Mapeamos los items usando `route` como clave única
  const itemsLabels = menuItems.map((item) => ({
    key: item.route,
    label: item.label,
  }));

  // Manejar la navegación al hacer clic en un elemento del menú
  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="md"
      collapsedWidth="0"
      style={{ background: colorBgContainer }}
    >
      <Menu
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
