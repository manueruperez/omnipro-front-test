import { Layout, Menu } from "antd";
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

  // Mapeamos correctamente los items con la clave `route`
  const itemsLabels = menuItems.map((item) => ({
    key: item.route, // Usar `route` como clave única
    label: item.label,
  }));

  // Manejar la navegación al hacer clic en un elemento del menú
  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key); // `key` ahora es la `route`
  };

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
        defaultSelectedKeys={[menuItems[0]?.route]} // Selección inicial
        items={itemsLabels}
        onClick={handleMenuClick} // Redirige al hacer clic
      />
    </Sider>
  );
};

export default Sidebar;
