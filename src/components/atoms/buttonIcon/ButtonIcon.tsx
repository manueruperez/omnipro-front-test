import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

interface ButtonIconProps {
  onClick: () => void;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ onClick }) => (
  <Button
    type="text"
    icon={
      <MenuOutlined
        style={{ color: "var(--primary-color)", fontSize: "18px" }}
      />
    }
    onClick={onClick}
  />
);

export default ButtonIcon;
