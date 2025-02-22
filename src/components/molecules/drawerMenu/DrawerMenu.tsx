import { Drawer, Menu } from "antd";
import { useNavigate } from "react-router-dom";

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
  const itemsLabels = menuItems.map((item, index) => ({
    key: index,
    label: item.label,
  }));

  const handleMenuClick = (key: string) => {
    const selectedItem = menuItems[+key];
    if (selectedItem) {
      navigate(selectedItem.route);
      onClose();
    }
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
        defaultSelectedKeys={["1"]}
        items={itemsLabels}
        onClick={(e) => handleMenuClick(e.key)}
      />
    </Drawer>
  );
};
export default DrawerMenu;
