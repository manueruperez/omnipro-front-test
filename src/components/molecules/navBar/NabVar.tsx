import { Layout, Grid, Switch, theme } from "antd";
import ButtonIcon from "#atoms/buttonIcon/ButtonIcon.tsx";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "#store/store.ts";
import { toggleTheme } from "#modules/theme/theme.reducer.ts";
import "./navBar.css";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

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

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header
      className="HeaderWrapper p-4"
      style={{
        background: colorBgContainer,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className="flex flex-row w-full justify-between items-center al"
        style={{ maxWidth: 1080 }}
      >
        {!screens.md && <ButtonIcon onClick={onMenuClick} />}
        <h1 className="text-xl font-bold mb-4">Administrador de projectos</h1>
        <Switch
          checked={currentTheme === "dark"}
          onChange={handleThemeToggle}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
        />
      </div>
    </Header>
  );
};

export default Navbar;
