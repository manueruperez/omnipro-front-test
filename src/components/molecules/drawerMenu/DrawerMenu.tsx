import { Drawer, Menu } from "antd";

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
  const itemsLabels = menuItems.map((item, index) => ({
    key: index,
    label: item.label,
  }));
  return (
    <Drawer
      title="Menú"
      placement="left"
      closable
      onClose={onClose}
      open={visible}
    >
      <Menu mode="vertical" defaultSelectedKeys={["1"]} items={itemsLabels} />
    </Drawer>
  );
};
export default DrawerMenu;
