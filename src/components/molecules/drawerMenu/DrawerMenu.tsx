import { Drawer, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

interface DrawerMenuProps {
  visible: boolean;
  menuItems: { label: string; route: string }[];
  onClose: () => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({
  visible,
  onClose,
  menuItems,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const itemsLabels = menuItems.map((item) => ({
    key: item.route,
    label: item.label,
  }));

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key);
    onClose();
  };

  return (
    <Drawer
      title="Menú"
      placement="left"
      closable
      onClose={onClose}
      open={visible}
    >
      <Menu
        mode="vertical"
        selectedKeys={[location.pathname]}
        items={itemsLabels}
        onClick={handleMenuClick}
      />
    </Drawer>
  );
};

export default DrawerMenu;
