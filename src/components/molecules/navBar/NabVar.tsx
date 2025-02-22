import { Layout, Grid, Switch, theme } from "antd";
import ButtonIcon from "#atoms/buttonIcon/ButtonIcon.tsx";
import Title from "#atoms/title/Title.tsx";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "#store/store.ts";
import { toggleTheme } from "#modules/theme/theme.reducer.ts";
import "./navBar.css";

const { Header } = Layout;
const { useBreakpoint } = Grid;

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: AppState) => state.theme.theme);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  // Obtenemos el token que se actualiza según el tema
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header
      className="HeaderWrapper"
      style={{ background: colorBgContainer }} // Aplica el color de fondo del token
    >
      {!screens.md && <ButtonIcon onClick={onMenuClick} />}
      <h1> Mi Aplicación</h1>
      <Switch
        checked={currentTheme === "dark"}
        onChange={handleThemeToggle}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
    </Header>
  );
};

export default Navbar;
