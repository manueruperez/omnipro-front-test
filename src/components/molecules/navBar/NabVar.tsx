import { Layout, Grid } from "antd";
import ButtonIcon from "#atoms/buttonIcon/ButtonIcon.tsx";
import Title from "#atoms/title/Title.tsx";

const { Header } = Layout;
const { useBreakpoint } = Grid;

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const screens = useBreakpoint();

  return (
    <Header className="flex items-center justify-between px-4">
      {!screens.md && <ButtonIcon onClick={onMenuClick} />}
      <Title text="Mi Aplicación" />
    </Header>
  );
};

export default Navbar;
